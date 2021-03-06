import React from "react";
import Chart from "./Chart";
import { pitchingLabels, pitchingLabelsAbr } from "../../../utils/statsLabels";

function PlayerChart(props) {
  const { data } = props;

  if (data === undefined) return <div></div>;

  const pitchingStats = data[0];

  // remove Team and Season from dropdown options
  const pitchingLabelsFiltered = pitchingLabels.slice(2, pitchingLabels.length);
  const pitchingLabelsAbrFiltered = pitchingLabelsAbr.slice(
    2,
    pitchingLabelsAbr.length
  );

  return (
    <div className="stats-container">
      <Chart
        data={pitchingStats}
        labels={pitchingLabelsFiltered}
        labelsAbr={pitchingLabelsAbrFiltered}
      />
    </div>
  );
}

export default PlayerChart;
