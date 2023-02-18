import React from "react";
import { FormControl, Radio, RadioGroup } from "@mui/material";
import "./css/settings.css";
import store from "../../redux/store";
import {
  selectBackgroundImage,
  selectTheme,
} from "../../redux/Selector/selector.actions";
import { useSelector } from "react-redux";
import { StyledFormControlLabel } from "../../Components/modifiedComponents/StyledFormControlLabel";
import defaultImg from "../../data/images/Default.jpg";
import oceanImg from "../../data/images/Ocean.jpg";
import desertImg from "../../data/images/Desert.jpg";
import easterEgg from "../../data/images/EasterEgg.png";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
export const Settings = () => {
  const storeSelectedThemeData = useSelector((state) => state.themeSelect);
  const backgroundSelect = useSelector((state) => state.backgroundSelect);
  const colorSettings = {
    default: {
      "--primary": "teal",
      "--secondary": "sandybrown",
      "--bg-color": "whitesmoke",
      "--text-color": "darkslategray",
      "--diap-text-color": "whitesmoke",
      "--editCell": "lightgray",
      "--avarage-fun": "blue",
      "--avarage-diff": "red",
      "--bg-image": `url(${defaultImg})`,
    },
    ocean: {
      "--primary": "#064273",
      "--secondary": "#76b6c4",
      "--bg-color": "#faffff",
      "--text-color": "#141163",
      "--diap-text-color": "#faffff",
      "--editCell": "#def3f6",
      "--avarage-fun": "#157306",
      "--avarage-diff": "#f80034",
      "--bg-image": `url(${oceanImg})`,
    },
    desert: {
      "--primary": "#f6540d",
      "--secondary": "#ffce00",
      "--bg-color": "#fefff0",
      "--text-color": "#a51515",
      "--diap-text-color": "#fefff0",
      "--editCell": "#edf29a",
      "--avarage-fun": "#157306",
      "--avarage-diff": "#c800ff",
      "--bg-image": `url(${desertImg})`,
    },
  };
  const r = document.querySelector("html");
  const imageToggle = (event) => {
    const str2bool = (value) => {
      if (value && typeof value === "string") {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
      }
      return value;
    };
    store.dispatch(selectBackgroundImage(str2bool(event.target.value)));
    const val = str2bool(event.target.value)
      ? colorSettings[storeSelectedThemeData]["--bg-image"]
      : "none";
    r.style.setProperty("--bg-image", val);
  };
  const changeSettings = (event) => {
    const selectedPallet = colorSettings[event.target.value];
    for (let [key, value] of Object.entries(selectedPallet)) {
      if (key === "--bg-image" && !backgroundSelect) {
        value = "none";
      }
      r.style.setProperty(key, value);
    }
    store.dispatch(selectTheme(event.target.value));
  };
  const [eEHint, setEEHint] = React.useState(false);
  return (
    <div className={"pageContainer"}>
      <div className={"widgetTitle pageTitle"}>Settings</div>
      <div className={"widgetContainer "}>
        <div className="assignmentShowInfo">
          <label className="assignmentShowTitle">With background image</label>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="style-radio-buttons-group-label"
              value={backgroundSelect}
              defaultValue={backgroundSelect}
              name="style-radio-buttons-group"
              onChange={imageToggle}
            >
              <StyledFormControlLabel
                value={true}
                control={<Radio />}
                label="Yes"
              />
              <StyledFormControlLabel
                value={false}
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <FormControl>
          <RadioGroup
            aria-labelledby="style-radio-buttons-group-label"
            defaultValue={storeSelectedThemeData}
            value={storeSelectedThemeData}
            name="style-radio-buttons-group"
            onChange={changeSettings}
          >
            <div className={"settingsColorChooser"}>
              <div className={"flexContainer settingsFormControl"}>
                <div className={"settingsFormControlBlock"}>
                  <StyledFormControlLabel
                    value="default"
                    control={<Radio />}
                    label=" Default"
                  />
                </div>
                <div className={"flexContainer"}>
                  <div
                    className={"settingsColorBlock"}
                    style={{
                      backgroundColor: `${colorSettings.default["--primary"]}`,
                      color: "white",
                    }}
                  >
                    Primary
                  </div>
                  <div
                    className={"settingsColorBlock"}
                    style={{
                      backgroundColor: `${colorSettings.default["--secondary"]}`,
                      color: "white",
                    }}
                  >
                    Secondary
                  </div>
                  <div
                    className={"settingsColorBlock"}
                    style={{
                      backgroundColor: `${colorSettings.default["--bg-color"]}`,
                      color: "black",
                    }}
                  >
                    Background
                  </div>
                  <div
                    className={"settingsColorBlock"}
                    style={{
                      backgroundColor: `${colorSettings.default["--text-color"]}`,
                      color: "white",
                    }}
                  >
                    Text
                  </div>
                </div>
              </div>
              <div className={"flexContainer settingsFormControl"}>
                <div className={"settingsFormControlBlock"}>
                  <StyledFormControlLabel
                    value="ocean"
                    control={<Radio />}
                    label=" Ocean"
                  />
                </div>
                <div className={"flexContainer"}>
                  <div
                    className={"settingsColorBlock"}
                    style={{
                      backgroundColor: `${colorSettings.ocean["--primary"]}`,
                      color: "white",
                    }}
                  >
                    Primary
                  </div>
                  <div
                    className={"settingsColorBlock"}
                    style={{
                      backgroundColor: `${colorSettings.ocean["--secondary"]}`,
                      color: "white",
                    }}
                  >
                    Secondary
                  </div>
                  <div
                    className={"settingsColorBlock"}
                    style={{
                      backgroundColor: `${colorSettings.ocean["--bg-color"]}`,
                      color: "black",
                    }}
                  >
                    Background
                  </div>
                  <div
                    className={"settingsColorBlock"}
                    style={{
                      backgroundColor: `${colorSettings.ocean["--text-color"]}`,
                      color: "white",
                    }}
                  >
                    Text
                  </div>
                </div>
              </div>
              <div className={"flexContainer settingsFormControl"}>
                <div className={"settingsFormControlBlock"}>
                  <StyledFormControlLabel
                    value="desert"
                    control={<Radio />}
                    label=" Desert"
                  />
                </div>
                <div className={"flexContainer"}>
                  <div
                    className={"settingsColorBlock"}
                    style={{
                      backgroundColor: `${colorSettings.desert["--primary"]}`,
                      color: "white",
                    }}
                  >
                    Primary
                  </div>
                  <div
                    className={"settingsColorBlock"}
                    style={{
                      backgroundColor: `${colorSettings.desert["--secondary"]}`,
                      color: "white",
                    }}
                  >
                    Secondary
                  </div>
                  <div
                    className={"settingsColorBlock"}
                    style={{
                      backgroundColor: `${colorSettings.desert["--bg-color"]}`,
                      color: "black",
                    }}
                  >
                    Background
                  </div>
                  <div
                    className={"settingsColorBlock"}
                    style={{
                      backgroundColor: `${colorSettings.desert["--text-color"]}`,
                      color: "white",
                    }}
                  >
                    Text
                  </div>
                </div>
              </div>
            </div>
          </RadioGroup>
        </FormControl>
        <div>
          Konami Code
          <img
            alt="easterEgg"
            className={"settings-easterEgg"}
            src={easterEgg}
            onClick={() => setEEHint(!eEHint)}
          />
          {eEHint ? (
            <div className={"settings-hint"}>
              <ArrowCircleUpOutlinedIcon />
              <ArrowCircleUpOutlinedIcon />
              <ArrowCircleDownOutlinedIcon />
              <ArrowCircleDownOutlinedIcon />
              <ArrowCircleLeftOutlinedIcon />
              <ArrowCircleRightOutlinedIcon />
              <ArrowCircleLeftOutlinedIcon />
              <ArrowCircleRightOutlinedIcon /> b a
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
