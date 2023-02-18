// import React from 'react';
import resultsData from './data/PROVIDED_MOCK_DATA_RESULTS.tsv';
import studentsData from './data/MOCK_DATA_STUDENT.csv';
import assignmentsData from './data/MOCK_DATA_ASSIGNMENTS.csv';
import { v1 as uuidv1 } from 'uuid';
import { useSelector } from 'react-redux';

// Function for reading and parsing of the assignment data
export const fetchAssignmentsData = async () => {
  const response = await fetch(assignmentsData);
  const responseText = await response.text();
  return assignmentParser(responseText);
};

// Function for reading and parsing the students data
export const fetchStudentsData = async (parsedAssignmentsData) => {
  const response = await fetch(studentsData);
  const responseText = await response.text();
  return studentParser(responseText, parsedAssignmentsData);
};

// Function for reading, parsing and injecting the result data into the student data (in fetchStudentsData)
export const fetchResultsData = async (parsedStudentsData) => {
  const response = await fetch(resultsData);
  const responseText = await response.text();
  return resultsParser(responseText, parsedStudentsData);
};

/* Function for calculating the average values of the selected assignment array and the selected students
It looks a bit complicated, but I have to take in consideration the individual average of 'difficulty' and 'funFactor'
Also have to address the possibility of a string in the values
 */
export const averageAssignmentsCalculator = (
  assignmentsData,
  studentsData
) => {
  const templateObject = {
    difficulty: undefined,
    funFactor: undefined,
    id: '',
    name: '',
  };
  const retValBaseObject = {
    students: {},
    assignments: {},
    general: {
      difficulty: 0,
      funFactor: 0,
      numOfAssignments: 0,
      numOfStudents: 0,
    },
  };

  Object.keys(assignmentsData).forEach((assignmentCode) => {
    Object.values(studentsData).forEach((student) => {
      if (student.assignments.hasOwnProperty(assignmentCode)) {
        const retValStudent = retValBaseObject.students[student.id] ?? {
          ...templateObject,
          id: student.id,
          name: student.first_name,
        };
        const retValAssignment = retValBaseObject.assignments[
          assignmentCode
        ] ?? {
          ...templateObject,
          id: assignmentCode,
          name: assignmentCode,
        };
        const diffValue = student.assignments[assignmentCode].difficulty;
        retValStudent.difficulty = retValStudent.difficulty ?? [];
        retValStudent.difficulty.push(diffValue);
        retValAssignment.difficulty = retValAssignment.difficulty ?? [];
        retValAssignment.difficulty.push(diffValue);
        const funValue = student.assignments[assignmentCode].funFactor;
        retValStudent.funFactor = retValStudent.funFactor ?? [];
        retValStudent.funFactor.push(funValue);
        retValAssignment.funFactor = retValAssignment.funFactor ?? [];
        retValAssignment.funFactor.push(funValue);
        retValBaseObject.students[student.id] = {
          ...retValBaseObject.students[student.id],
          ...retValStudent,
        };
        retValBaseObject.assignments[assignmentCode] = {
          ...retValBaseObject.assignments[assignmentCode],
          ...retValAssignment,
        };
      }
    });
  });
  Object.values(retValBaseObject.students).forEach((student) => {
    const filteredStudentFunFactorResults = student.funFactor.filter(
      (entry) => isNaN(entry - 0) === false
    );
    const filteredStudentDifficultyResults = student.difficulty.filter(
      (entry) => isNaN(entry - 0) === false
    );
    if (filteredStudentFunFactorResults.length === 0) {
      student.funFactor = student.funFactor[0];
    } else {
      student.funFactor = (
        filteredStudentFunFactorResults.reduce((a, b) => (a - 0) + (b - 0)) /
        filteredStudentFunFactorResults.length
      ).toFixed(2);
    }
    if (filteredStudentDifficultyResults.length === 0) {
      student.difficulty = student.difficulty[0];
    } else {
      student.difficulty = (
        filteredStudentDifficultyResults.reduce((a, b) => (a - 0) + (b - 0)) /
        filteredStudentDifficultyResults.length
      ).toFixed(2);
    }
  });
  Object.values(retValBaseObject.assignments).forEach((assignment) => {
    const filteredAssignmentFunFactorResults = assignment.funFactor.filter(
      (entry) => isNaN(entry - 0) === false
    );
    const filteredAssignmentDifficultyResults = assignment.difficulty.filter(
      (entry) => isNaN(entry - 0) === false
    );
    if (filteredAssignmentFunFactorResults.length === 0) {
      assignment.funFactor = assignment.funFactor[0];
    } else {
      assignment.funFactor = (
        filteredAssignmentFunFactorResults.reduce((a, b) => (a - 0) + (b - 0)) /
        filteredAssignmentFunFactorResults.length
      ).toFixed(2);
    }
    if (filteredAssignmentDifficultyResults.length === 0) {
      assignment.difficulty = assignment.difficulty[0];
    } else {
      assignment.difficulty = (
        filteredAssignmentDifficultyResults.reduce((a, b) => (a - 0) + (b - 0)) /
        filteredAssignmentDifficultyResults.length
      ).toFixed(2);
    }
  });
  const genericValues = Object.values(retValBaseObject.assignments).reduce(
    (acc, assignment) => {
      if (isNaN(assignment.funFactor - 0) === false) {
        acc.funFactor += assignment.funFactor - 0;
        acc.funCounter++;
      }
      if (isNaN(assignment.difficulty - 0) === false) {
        acc.difficulty += assignment.difficulty - 0;
        acc.diffCounter++;
      }
      return acc;
    },
    { difficulty: 0, funFactor: 0, funCounter: 0, diffCounter: 0 }
  );
  retValBaseObject.general.funFactor = genericValues.funCounter===0?'NA':(
    genericValues.funFactor / genericValues.funCounter
  ).toFixed(2);
  retValBaseObject.general.difficulty = genericValues.diffCounter===0?'NA':(
    genericValues.difficulty / genericValues.diffCounter
  ).toFixed(2);
  retValBaseObject.general.numOfAssignments = Object.keys(
      retValBaseObject.assignments
  ).length;
  retValBaseObject.general.numOfStudents = Object.keys(
      retValBaseObject.students
  ).length;
  return retValBaseObject;
};

// Function for filtering of the assignments and students based on the given selection array
export const dataSelectorFilter = (dataObject, selectionArr) => {
  return Object.fromEntries(
    Object.entries(dataObject).filter(([key]) => {
      return selectionArr.length === 0 || selectionArr.indexOf(key) > -1;
    })
  );
};

// Function for creating the title above the average data graph
export const GetTitleText = (
  filteredStudentData,
  filteredAssignmentsData,
  averageOrResult
) => {
  const studentsData = useSelector((state) => state.studentsData);
  const assignmentData = useSelector((state) => state.assignmentsData);
  const studentsDataLength = Object.keys(filteredStudentData).length;
  const assignmentsDataLength = Object.keys(filteredAssignmentsData).length;
  let preText = 'Average of ';
  if (averageOrResult === 'result') {
    preText = 'Result for ';
  }

  let studentText = `${preText} ${
    Object.keys(filteredStudentData).length
  } students`;
  if (studentsDataLength === 1) {
    studentText = `Result for ${
      Object.values(filteredStudentData)[0].first_name
    } ${Object.values(filteredStudentData)[0].last_name}`;
  } else if (
    Object.keys(filteredStudentData).length < Object.keys(studentsData).length
  ) {
    studentText = `${preText} ${
      Object.keys(filteredStudentData).length
    } of the ${Object.keys(studentsData).length} students`;
  }
  let assignmentText = `${
    Object.keys(filteredAssignmentsData).length
  } assignments`;
  if (assignmentsDataLength === 1) {
    assignmentText = `${
      Object.values(filteredAssignmentsData)[0].assignment_code
    }`;
  } else if (
    Object.keys(filteredAssignmentsData).length <
    Object.keys(assignmentData).length
  ) {
    assignmentText = `${Object.keys(filteredAssignmentsData).length} of the ${
      Object.keys(assignmentData).length
    } assignments`;
  }
  return `${studentText} for ${assignmentText}`;
};

// This is for plain text to replace \n for <\br> for displaying line breaks in html
export const replaceWithBr = (text) => {
  return text.replace(/\n/g, '<br />');
};

// Function for parsing the raw read students data
// Only to be used within this file, no export
const studentParser = (rawData, parsedAssignmentsData) => {
  const lineReducer = (accumulator, line, index) => {
    // First line is the header, skip this one
    if (index === 0) {
      return accumulator;
    }
    const assignments = Object.keys(parsedAssignmentsData).reduce(
      (acc, entry) => {
        acc[entry] = { difficulty: 'NA', funFactor: 'NA' };
        return acc;
      },
      {}
    );
    const columnsArr = line.split('\t');
    const student_number = columnsArr[0];
    const first_name = columnsArr[1];
    const last_name = columnsArr[2];
    const email = columnsArr[3];
    const phone = columnsArr[4];
    const avatar = columnsArr[5];
    const birthday = columnsArr[6];
    if (accumulator.hasOwnProperty(student_number) === false) {
      accumulator[student_number] = {
        id: student_number,
        student_number: student_number,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        avatar: new URL(avatar),
        birthday: birthday,
        assignments: assignments,
      };
    }
    return accumulator;
  };
  const linesArr = rawData.replace('\r\n', '\n').split('\n');
  return linesArr.reduce(lineReducer, {});
};

// Function for parsing the raw read assignment data
// Only to be used within this file, no export
const assignmentParser = (rawData) => {
  const lineReducer = (accumulator, line, index) => {
    // First line is the header, skip this one
    if (index === 0) {
      return accumulator;
    }
    const columnsArr = line.split('\t');
    const assignment_code = columnsArr[0];
    const Week_number = columnsArr[1];
    const Day_number = columnsArr[2];
    const sequence_number = columnsArr[3];
    const project = columnsArr[4];
    const project_name = columnsArr[5];
    const description = columnsArr[6];
    if (accumulator.hasOwnProperty(assignment_code) === false) {
      accumulator[assignment_code] = {
        id: assignment_code,
        assignment_code: assignment_code,
        Week_number: Week_number,
        Day_number: Day_number,
        sequence_number: sequence_number,
        project: project,
        project_name: project_name,
        description: description,
      };
    }
    return accumulator;
  };
  const linesArr = rawData.replace('\r\n', '\n').split('\n');
  return linesArr.reduce(lineReducer, {});
};

// Function for parsing the raw read result data
// Only to be used within this file, no export
const resultsParser = (rawData, parsedUserData) => {
  const lineReducer = (accumulator, line, index) => {
    // First line is the header, skip this one
    if (index === 0) {
      return accumulator;
    }

    const columnsArr = line.split('\t');
    const first_name = columnsArr[0];
    const assignmentCode = columnsArr[1];
    const difficulty = columnsArr[2] - 0;
    const funFactor = columnsArr[3] - 0;

    // No user, fallback to unique uuid
    const id = studentIdLookupTable[first_name] ?? uuidv1();

    if (accumulator.hasOwnProperty(id) === false) {
      accumulator[id] = {
        id: id,
        assignments: {
          assignmentCode: { difficulty: difficulty, funFactor: funFactor },
        },
      };
    } else {
      accumulator[id].assignments[assignmentCode] = {
        difficulty: difficulty,
        funFactor: funFactor,
      };
    }
    return accumulator;
  };
  // Temp lookup table for querying the id of a user
  const studentIdLookupTable = Object.entries(parsedUserData).reduce(
    (acc, [k, v]) => {
      acc[v.first_name] = k;
      return acc;
    },
    {}
  );
  const linesArr = rawData.replace('\r\n', '\n').split('\n'); // Windows return replace for a normal return
  return linesArr.reduce(lineReducer, parsedUserData);
};

// Calculate the top "topNumber" of a "type" of an "obj"
// get thr top 3 difficulty or funFactor with the highest or the lowest score
export const topNumber = ({ direction, obj, type, topNumber }) => {
  return Object.keys(obj[type])
    .sort((a, b) => {
      return direction === 'high' ? b - a : a - b;
    })
    .slice(0, topNumber)
    .reduce((acc, value) => {
      acc[value] = obj[type][value];
      return acc;
    }, {});
};

// Collect and sort the results
export const sortAndCollectRatings = ({averageData})=>{
  return Object.values(averageData).reduce((acc, value) => {
    const id = value.name;
    acc.nameLookupTable[value.name] = value.id;
    const difficultyResult = value.difficulty;
    const funFactorResult = value.funFactor;
    if (isNaN(value.difficulty) === false) {
      if (acc.difficulty.hasOwnProperty(difficultyResult)) {
        acc.difficulty[difficultyResult].push(id);
      } else {
        acc.difficulty[difficultyResult] = [id];
      }
    }
    if (isNaN(value.funFactor) === false) {
      if (acc.funFactor.hasOwnProperty(funFactorResult)) {
        acc.funFactor[funFactorResult].push(id);
      } else {
        acc.funFactor[funFactorResult] = [id];
      }
    }
    return acc;
  }, {difficulty: {}, funFactor: {},nameLookupTable:{}})
};
