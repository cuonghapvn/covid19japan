import React, { useEffect, useState } from "react";
import { string, bool } from "prop-types";
import gradient from "./linearGradient";
import Loader from "../Loader";
import updateTooltipLang from "../Header/UpdateTooltipLang";

const Kpi = ({
  id,
  label,
  value,
  diff,
  caption,
  chartName,
  percent,
  isActive,
}) => {
  const [graph, setGraph] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (chartName) {
      let svgURL = `https://data.covid19japan.com/charts/${chartName}`;
      fetch(svgURL).then((response) => {
        if (response.status === 200) {
          response.text().then((data) => {
            setIsLoading(false);
            setGraph(data);
          });
        }
      });
      if (isActive) updateTooltipLang();
    }
  }, [chartName, isActive]);

  return (
    <>
      <div className="vitals">
        <div className="label">
          {label}
          {isActive && <span> &#9432;</span>}
        </div>
        <div className="value">{value} </div>
        <div className="diff">( {diff} )</div>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: percent }}
        ></div>
      </div>
      <Loader isLoaded={isLoading} />
      <div>
        {graph && (
          <div
            className="chart"
            id={`kpi-${id}-chart`}
            dangerouslySetInnerHTML={{
              __html: `${gradient[id]}${graph}`,
            }}
          ></div>
        )}
        {!isLoading && (
          <p
            className="chart-caption"
            dangerouslySetInnerHTML={{
              __html: caption,
            }}
          ></p>
        )}
      </div>
    </>
  );
};

Kpi.propTypes = {
  id: string,
  label: string,
  value: string,
  diff: string,
  caption: string,
  chartName: string,
  percent: string,
  isActive: bool,
};

Kpi.defaultProps = {
  id: "",
  label: "",
  value: "",
  diff: "",
  caption: "",
  chartName: "",
  percent: "",
  isActive: false,
};

export default Kpi;
