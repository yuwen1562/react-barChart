import React, { useState } from "react";
import { Bar } from "@ant-design/charts";
import _ from "lodash";

const DemoColumn: React.FC = () => {
  const [testLength, setTestLength] = useState("");

  const data = [
    {
      value: 900,
      type: "超過六個字的範例"
    },
    {
      value: 1400,
      type: "1 KKK-9999"
    },
    {
      value: 100,
      type: "四個字喔"
    },
    {
      value: 900,
      type: "項目四"
    },
    {
      value: 1600,
      type: "兩個"
    },
    {
      value: 1600,
      type: "一"
    },
    {
      value: 700,
      type: "項目六"
    },
    {
      value: 1000,
      type: "項目七"
    },
    {
      value: 4558,
      type: "項目八"
    },
    {
      value: 1700,
      type: "項目九"
    }
  ];

  const config = {
    data: data,
    autoFit: true,
    color: "#4289c7",
    maxBarWidth: 15,
    // appendPadding: [0, 20, 0, 0],
    xField: "value",
    yField: "type",
    label: {
      position: "right",
      offset: 5,
      style: {
        fill: "#4289c7",
        fontSize: 12,
        fontWeight: 700
      },
      formatter: (item) => {
        return item.value.toLocaleString();
      }
    },
    xAxis: {
      label: null,
      grid: null
    },
    yAxis: {
      line: null,
      tickLine: null,
      label: {
        style: {
          textAlign: "start",
          fontSize: 14,
          fill: "black"
        },
        offset: testLength,
        formatter: (text) => {
          const oldLabel = text;

          // [^x00-xff] 這寫法雖然漢字會被替換，但是標點符號也都會被替換成2個字元
          const labelLength = oldLabel.replace(/[^\x00-\xff]/g, "xx").length;

          let textLen = 0;
          if (_.ceil(labelLength / 2) > textLen) {
            textLen = _.ceil(labelLength / 2);
            if (textLen >= 6) {
              setTestLength(95);
            } else if (textLen >= 5) {
              setTestLength(82);
            } else if (textLen >= 4) {
              setTestLength(66);
            } else if (textLen >= 3) {
              setTestLength(52);
            } else if (textLen >= 2) {
              setTestLength(38);
            } else {
              setTestLength(24);
            }
          }

          let newLabel = "";
          if (labelLength > 12) {
            let strLen = 0;
            let firstStr = "";
            let lastStr = "";
            for (let i = 0; i < labelLength; i++) {
              if (oldLabel.charCodeAt(i) > 128) {
                strLen += 2;
              } else {
                strLen++;
              }
              if (strLen <= 12) {
                firstStr += oldLabel.charAt(i);
              } else {
                lastStr += oldLabel.charAt(i);
              }
            }
            newLabel = `${firstStr}\n${lastStr}`;
          } else {
            newLabel = oldLabel;
          }
          return newLabel;
        }
      }
    },
    tooltip: {
      showContent: false
    }
  };

  return <Bar {...config} />;
};

export default DemoColumn;
