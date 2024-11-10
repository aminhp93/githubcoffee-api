/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Import libaries
import { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import { Box, Button } from "@mui/material";
import Highcharts from "highcharts";
import { GridColDef } from "@mui/x-data-grid-premium";

// Import local files
import { getDefaultOptions } from "@/@core/components/chart/utils";
import useFireantStore from "@/@core/services/fireant/useFireantStore";
import { RawData } from "../types";

import ConfigOption from "../@components/TimeAndDisplayConfig";
import useConfigStore from "../useConfigStore";
import Table from "@/@core/components/table";
import FMarketService from "@/@core/services/f-market/service";
import {
  formatNumber,
  getCellClassName,
} from "@/features/dashboard/fireant/fireant-watchlists/utils";
import { mapData, getNthSmallestDateInMonth, INIT_DATE } from "./utils";
import dayjs, { Dayjs } from "dayjs";

export const processDates = (
  data: Dayjs[][],
  monthIndex = 0,
  currentCombination: Dayjs[] = [],
  currentIndex = 1,
  totalCombinations = 1
): { combinations: Dayjs[][]; currentIndex: number } => {
  // Base case: if we've processed all months
  if (monthIndex >= data.length) {
    console.log(
      `${currentIndex}/${totalCombinations}`
      // currentCombination.map((date) => date.format("YYYY-MM-DD"))
    );
    return {
      combinations: [currentCombination],
      currentIndex: currentIndex + 1,
    };
  }

  const month = data[monthIndex];
  const results: Dayjs[][] = [];

  // Recursive case: generate combinations for each date in the current month
  for (const date of month) {
    const result = processDates(
      data,
      monthIndex + 1,
      [...currentCombination, date],
      currentIndex,
      totalCombinations * month.length
    );
    results.push(...result.combinations);
    currentIndex = result.currentIndex;
  }

  return { combinations: results, currentIndex };
};

const FMarket = () => {
  const config = useConfigStore((state) => state.config);
  const selectedWatchlist = useFireantStore((state) => state.selectedWatchlist);

  const [rawData, setRawData] = useState<RawData>([]);
  const [rows, setRows] = useState<any>([]);
  const [options] = useState<Highcharts.Options>(getDefaultOptions());

  const test = () => {
    console.log("test");
    (async () => {
      try {
        const res = await FMarketService.getNavHistory();
        const result: {
          [key: number]: {
            all: any[];
            n: number;
            lastData: any;
          };
        } = {};
        for (let n = 1; n < 9; n++) {
          const data = res.data.filter((i) => i.navDate > INIT_DATE);

          // uniq data by key navDate, get the first one
          const validatedData = Object.values(
            data.reduce((acc: { [key: string]: (typeof data)[0] }, cur) => {
              if (!acc[cur.navDate]) {
                acc[cur.navDate] = cur;
              }
              return acc;
            }, {})
          );
          const listDate = validatedData.map((i) => dayjs(i.navDate));

          const smallestDateInMonth = getNthSmallestDateInMonth(listDate, n);

          const mappedRes = mapData(res, smallestDateInMonth);
          //  find the last data that have navTest not undefined
          let lastData;
          // find the last data that have navTest not undefined
          for (let i = mappedRes.length - 1; i >= 0; i--) {
            if (mappedRes[i].navTest) {
              lastData = mappedRes[i];
              break;
            }
          }

          result[n] = {
            all: mappedRes,
            n,
            lastData,
          };
        }
        console.log("result", result);
        // filter result by navTestPercent in lastData
        const sortedResult = Object.values(result).sort((a, b) => {
          return b.lastData.navTestPercent - a.lastData.navTestPercent;
        });
        console.log("sortedResult", sortedResult);
        setRows(sortedResult[0].all);

        // setRows(mappedRes);

        // const xxx = mapListDate(res);
        // console.log("xxx", xxx);

        // // get largest navTestPercent of each array in xxx

        // const result = [];
        // const totalLoops = processDates(xxx);
        // totalLoops.combinations.forEach((combination, index) => {
        //   console.log("index", index);
        //   const all = mapData(
        //     res,
        //     combination.map((date) => date.format("YYYY-MM-DD"))
        //   );
        //   let lastData;
        //   // find the last data that have navTest not undefined
        //   for (let i = all.length - 1; i >= 0; i--) {
        //     if (all[i].navTest) {
        //       lastData = all[i];
        //       break;
        //     }
        //   }

        //   result.push({
        //     all,
        //     lastData,
        //   });
        // });

        // // sort by largest navTestPercent
        // const sortedResult = result.sort((a, b) => {
        //   return b.lastData.navTestPercent - a.lastData.navTestPercent;
        // });

        // console.log("totalLoops", totalLoops, sortedResult);
        // setRows(sortedResult[0].all);
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await FMarketService.getNavHistory();
        const data = res.data.filter((i) => i.navDate > INIT_DATE);

        // uniq data by key navDate, get the first one
        const validatedData = Object.values(
          data.reduce((acc: { [key: string]: (typeof data)[0] }, cur) => {
            if (!acc[cur.navDate]) {
              acc[cur.navDate] = cur;
            }
            return acc;
          }, {})
        );
        const listDate = validatedData.map((i) => dayjs(i.navDate));

        const smallestDateInMonth = getNthSmallestDateInMonth(listDate, 9);

        const mappedRes = mapData(res, smallestDateInMonth);

        // find the largset navTestPercent in each item navDate with same month and year
        // group data by field navDate with same year and month
        // const groupedData = Object.values(
        //   mappedRes.reduce((acc: { [key: string]: typeof mappedRes }, item) => {
        //     const date = dayjs(item.navDate);
        //     const key = date.format("YYYY-MM");
        //     if (!acc[key]) {
        //       acc[key] = [item];
        //     } else {
        //       acc[key].push(item);
        //       acc[key].sort((a, b) => a.navDate.localeCompare(b.navDate));
        //     }
        //     return acc;
        //   }, {})
        // );
        // console.log("groupedData1", groupedData);
        // in each group, find the largest navChangePercent
        // const xxx2 = [];
        // groupedData.forEach((group) => {
        //   const largest = group.reduce((acc, cur) => {
        //     return acc.navChangePercent < cur.navChangePercent ? acc : cur;
        //   });
        //   console.log("largest", largest);
        //   xxx2.push(largest);
        // });

        // const x2 = mapData(
        //   res,
        //   xxx2.map((i) => i.navDate)
        // );
        // console.log("x2", x2);

        setRawData(mappedRes);

        // setRows(x2);
        setRows(mappedRes);
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    })();
  }, [selectedWatchlist, config.category, config.timeRange]);

  return (
    <Box>
      <ConfigOption />

      <Box mt={2} sx={{ height: 500 }}>
        {config.displayType === "raw-data" && (
          <Box
            sx={{
              height: "300px",
              overflow: "auto",
            }}
          >
            <pre>{JSON.stringify(rawData, null, 2)}</pre>
          </Box>
        )}
        {config.displayType === "table" && (
          <Box
            sx={{
              height: "600px",
              "& .color-red": {
                color: "rgb(238, 84, 66)",
              },
              "& .color-green": {
                color: "rgb(0, 170, 0)",
              },
              "& .color-unset": {
                color: "unset",
              },
              "& .color-yellow": {
                color: "rgb(204, 170, 0)",
              },
              "& .background-light-green": {
                backgroundColor: "rgb(230, 255, 230)",
              },
              "& .background-light-yellow": {
                backgroundColor: "rgb(255, 255, 230)",
              },
            }}
          >
            <Table
              columns={columns}
              rows={rows}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    // Hide columns status and traderName, the other columns will remain visible
                    id: false,
                  },
                },
              }}
            />
          </Box>
        )}
        {config.displayType === "chart" && (
          <HighchartsReact highcharts={Highcharts} options={options} />
        )}
        <Button
          onClick={() => {
            test();
          }}
        >
          Test
        </Button>
      </Box>
    </Box>
  );
};

export default FMarket;

const columns: GridColDef[] = [
  { field: "id", headerName: "id", width: 100, groupable: false },
  {
    field: "navDate",
    headerName: "navDate",
    minWidth: 120,
  },
  {
    field: "nav",
    headerName: "nav",
    minWidth: 120,
    align: "right",
    renderCell: (params) => {
      return params.value ? formatNumber(Number(params.value.toFixed(0))) : "-";
    },
  },
  {
    field: "navChange",
    headerName: "navChange",
    minWidth: 120,
    align: "right",
    renderCell: (params) => {
      return params.value ? formatNumber(Number(params.value.toFixed(0))) : "-";
    },
  },
  {
    field: "navChangePercent",
    headerName: "navChangePercent",
    minWidth: 120,
    align: "right",
    cellClassName: (params) => {
      return getCellClassName(params.row.navChange);
    },
    renderCell: (params) => {
      return params.value ? formatNumber(Number(params.value.toFixed(2))) : "-";
    },
  },

  {
    field: "navAll",
    headerName: "navAll",
    minWidth: 120,
    cellClassName: "background-light-green",
    renderCell: (params) => {
      return params.value ? formatNumber(Number(params.value.toFixed(2))) : "-";
    },
  },
  {
    field: "navAllReal",
    headerName: "navAllReal",
    minWidth: 120,
    cellClassName: "background-light-green",
    renderCell: (params) => {
      return params.value ? formatNumber(Number(params.value.toFixed(2))) : "-";
    },
  },
  {
    field: "navAllPercent",
    headerName: "navAllPercent",
    minWidth: 120,
    cellClassName: "background-light-green",
    renderCell: (params) => {
      return params.value ? formatNumber(Number(params.value.toFixed(2))) : "-";
    },
  },
  {
    field: "navTest",
    headerName: "navTest",
    minWidth: 120,
    cellClassName: "background-light-yellow",
    renderCell: (params) => {
      return params.value ? formatNumber(Number(params.value.toFixed(2))) : "-";
    },
  },
  {
    field: "navTestReal",
    headerName: "navTestReal",
    minWidth: 120,
    cellClassName: "background-light-yellow",
    renderCell: (params) => {
      return params.value ? formatNumber(Number(params.value.toFixed(2))) : "-";
    },
  },
  {
    field: "navTestPercent",
    headerName: "navTestPercent",
    minWidth: 120,
    cellClassName: "background-light-yellow",
    renderCell: (params) => {
      return params.value ? formatNumber(Number(params.value.toFixed(2))) : "-";
    },
  },
];
