/* eslint-disable no-console */
import { NavHistoryResponse } from "@/@core/services/f-market/schema";
import dayjs, { Dayjs } from "dayjs";

const INIT_NAV = 1;
const ADDED_NAV = 1;

type DateMap = { [key: string]: dayjs.Dayjs[] };

export const INIT_DATE = "2019-01-01";

export const mapListDate = (result: NavHistoryResponse) => {
  // validate data
  const data = result.data.filter((i) => i.navDate > INIT_DATE);

  // uniq data by key navDate, get the first one
  const validatedData = Object.values(
    data.reduce((acc: { [key: string]: (typeof data)[0] }, cur) => {
      if (!acc[cur.navDate]) {
        acc[cur.navDate] = cur;
      }
      return acc;
    }, {})
  );

  // group data by field navDate with same year and month
  return Object.values(
    validatedData.reduce((acc: DateMap, item) => {
      const date = dayjs(item.navDate);
      const key = date.format("YYYY-MM");
      if (!acc[key]) {
        acc[key] = [date];
      } else {
        acc[key].push(date);
        acc[key].sort((a, b) => a.diff(b));
      }
      return acc;
    }, {} as DateMap)
  );
};

export const getNthSmallestDateInMonth = (
  listDate: Dayjs[],
  n: number
): string[] => {
  return Object.values(
    listDate.reduce((acc: DateMap, date) => {
      const key = date.format("YYYY-MM");
      if (!acc[key]) {
        acc[key] = [date];
      } else {
        acc[key].push(date);
        acc[key].sort((a, b) => a.diff(b));
      }
      return acc;
    }, {})
  )
    .map((dates) =>
      dates.length >= n ? dates[n - 1].format("YYYY-MM-DD") : null
    )
    .filter((date) => date !== null);
};

export function mapData(result: NavHistoryResponse, listTestDate: string[]) {
  // validate data
  const data = result.data.filter((i) => i.navDate > INIT_DATE);

  // uniq data by key navDate, get the first one
  const validatedData = Object.values(
    data.reduce((acc: { [key: string]: (typeof data)[0] }, cur) => {
      if (!acc[cur.navDate]) {
        acc[cur.navDate] = cur;
      }
      return acc;
    }, {})
  );

  let navAll = INIT_NAV;
  let navAllReal = INIT_NAV;
  let navAllPercent = 0;

  let navTest = INIT_NAV;
  let navTestReal = INIT_NAV;
  let navTestPercent = 0;
  let navTestPreviousNav: number;

  // Example usage:
  const smallestDateInMonth = listTestDate;

  const xxx = validatedData.map((i, index) => {
    // Validate data
    const currentNav = i.nav;
    let navChange;
    let navChangePercent;
    let test = false;

    if (index === 0) {
      navTestPreviousNav = i.nav;
    }

    if (index > 0) {
      const previousNav = validatedData[index - 1].nav;
      navChange = currentNav - previousNav;
      navChangePercent = (navChange / previousNav) * 100;
    }

    if (navChangePercent !== undefined) {
      navAll = navAll * (1 + navChangePercent / 100) + ADDED_NAV;
      navAllReal = navAllReal + ADDED_NAV;
      navAllPercent = ((navAll - navAllReal) / navAllReal) * 100;
    }

    //   if date in smallestDateInMonth, set check to true
    if (smallestDateInMonth.includes(dayjs(i.navDate).format("YYYY-MM-DD"))) {
      test = true;
      if (navChangePercent !== undefined) {
        navTest =
          navTest * (1 + (i.nav - navTestPreviousNav) / navTestPreviousNav) +
          ADDED_NAV;
        navTestReal = navTestReal + ADDED_NAV;
        navTestPercent = ((navTest - navTestReal) / navTestReal) * 100;

        navTestPreviousNav = i.nav;
      }
    }

    return {
      ...i,
      navChange,
      navChangePercent,
      navAll,
      navAllReal,
      navAllPercent,
      test,
      navTest: index === 0 || test ? navTest : undefined,
      navTestReal: index === 0 || test ? navTestReal : undefined,
      navTestPercent: index === 0 || test ? navTestPercent : undefined,
    };
  });

  return xxx;
}
