import React from "react";
import { styled } from "@mui/system";
import "../components/HomePage/CustomDivider.css";
import { useSelector } from "react-redux";

const SeparatorContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  zIndex: 0,
});

const SVGSeparator = styled("svg")({
  fill: "none",
  stroke: (theme) => (theme.palette.mode === "dark" ? "#57e0d7" : "#232929"), // Border color
  strokeWidth: "2px", // Adjust border width as needed
});

const FooterDivider = () => {
  const isItDarkTheme = useSelector((state) => state.isDarkTheme.value);

  return (
    <SeparatorContainer>
      <SVGSeparator
        id=""
        preserveAspectRatio="xMidYMax meet"
        viewBox="0 0 1600 100"
        style={{ display: "block" }}
      >
        <polygon
          style={{
            fill: isItDarkTheme ? "#162726" : "#fbfefe",
            stroke: isItDarkTheme ? "#57e0d7" : "#232929", // Border color
          }}
          points="-40,63.667 19.833,3.833 80,64 140,4 200,64 260,4 320,64 380,4 440,64 500,4 560,64 620,4 680,64 740,4 800,64 860,4 920,64 980,4 1040,64 1100,4 1160,64 1220,4 1280.333,64.333 1340.333,4.333 1400,64 1460,4 1520,64 1578,6 1636,64 1636,104 -40,104"
        ></polygon>
        <polygon
          style={{
            opacity: 1,
            fill: "#57e0d7",
            stroke: isItDarkTheme ? "#57e0d7" : "#57e0d7", // Border color
          }}
          points="-40,86 20,26 80,86 140,26 200,76 260,4 200,64 140,4 80,64 19.833,3.833 -40,63.667"
        ></polygon>
        <polygon
          style={{
            opacity: 1,
            fill: "#57e0d7",
            stroke: isItDarkTheme ? "#57e0d7" : "#57e0d7", // Border color
          }}
          points="1159,69 1220,8 1281,73 1340,14 1399,73 1460,12 1521,73 1578,16 1634,72 1636,73.333 1636,64 1578,6 1520,64 1460,4 1400,64 1340.333,4.333 1280.333,64.333 1220,4 1160,64 1100,4 1040,64 1100,10"
        ></polygon>
      </SVGSeparator>
    </SeparatorContainer>
  );
};

// import React from "react";
// import "../components/HomePage/CustomDivider.css";
// import { useSelector } from "react-redux";

// function FooterDivider() {
//   const isItDarkTheme = useSelector((state) => state.isDarkTheme.value);
//   //   log(isItDarkTheme);
//   return (
//     <div className="row">
//       <svg
//         id=""
//         preserveAspectRatio="xMidYMax meet"
//         className="svg-separator sep11"
//         viewBox="0 0 1600 100"
//         style={{ display: "block" }}
//         data-height="100"
//       >
//         <polygon
//           className=""
//           style={{ fill: isItDarkTheme ? "#162726" : "#fbfefe" }} // Updated color
//           points="-40,63.667 19.833,3.833 80,64 140,4 200,64 260,4 320,64 380,4 440,64 500,4 560,64 620,4 680,64 740,4 800,64 860,4 920,64 980,4 1040,64 1100,4 1160,64 1220,4 1280.333,64.333 1340.333,4.333 1400,64 1460,4 1520,64 1578,6 1636,64 1636,104 -40,104"
//         ></polygon>
//         <polygon
//           className=""
//           style={{ opacity: 1, fill: "#f89406" }}
//           points="-40,86 20,26 80,86 140,26 200,76 260,4 200,64 140,4 80,64 19.833,3.833 -40,63.667"
//         ></polygon>
//         <polygon
//           className=""
//           style={{ opacity: 1, fill: "#eb9532" }}
//           points="1159,69 1220,8 1281,73 1340,14 1399,73 1460,12 1521,73 1578,16 1634,72 1636,73.333 1636,64 1578,6 1520,64 1460,4 1400,64 1340.333,4.333 1280.333,64.333 1220,4 1160,64 1100,4 1040,64 1100,10"
//         ></polygon>
//       </svg>
//     </div>
//   );
// }

export default FooterDivider;
