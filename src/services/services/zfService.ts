import { updateDateStateWithSession } from "../utils/updateDateState";
import { api } from "../api/apiList";
import { serviceStore, systemStore } from "@/store";
import { Lesson, PracticeLesson } from "@/types/Lesson";
import { Exam } from "@/types/Exam";
import { Score } from "@/types/Score";
export default class ZFService {
  static async updateLessonTable(data?: { year: string; term: string }) {
    if (!data) {
      data = {
        year: systemStore.generalInfo.termYear,
        term: systemStore.generalInfo.term

      };
    }
    return updateDateStateWithSession(
      api.zf.lessonTable,
      data,
      "setLessonTable",
      (res: any) => {
        return {
          ...res.data.data,
          year: data?.year,
          term: data?.term
        };

      }
    );
  }

  static async updateExamInfo(data?: { year: string; term: string }) {
    if (!data) {
      data = {
        year: systemStore.generalInfo?.termYear,
        term: systemStore.generalInfo?.term
      };
    }
    return updateDateStateWithSession(
      api.zf.examInfo,
      data,
      "setExamInfo",
      (res) => {
        return {
          examInfo: res.data.data, // 和store/service/zf.ts 相对应
          year: data?.year,
          term: data?.term
        };
      }
    );
  }

  /**
   * 从缓存中获取考试安排信息
   * @param data 指定学期
   * @returns
   */
  static getExamInfo(data?: { year: string; term: string }): {
    data: Exam[];
    updateTime: Date | null;
  } {
    if (!data) {
      data = {
        year: systemStore.generalInfo?.termYear,
        term: systemStore.generalInfo?.term
      };
    }
    if (!serviceStore?.zf.examInfo[data.year])
      return { data: [], updateTime: null };
    if (!serviceStore?.zf.examInfo[data.year][data.term]?.data)
      return { data: [], updateTime: null };
    return serviceStore?.zf.examInfo[data.year][data.term];
  } // 直接得到考试安排信息

  static async updateScoreInfo(
    data?: { year: string; term: string, period: "期中" | "期末" }
  ) {
    if (!data) {
      data = {
        year: systemStore.generalInfo?.termYear,
        term: systemStore.generalInfo?.term,
        period: serviceStore.score.scorePeriod
      };
    }
    if (data.period === "期末") {
      return updateDateStateWithSession(
        api.zf.scoreInfo,
        data,
        "setScoreInfo",
        (res) => ({
          scoreInfo: res.data.data,
          year: data?.year,
          term: data?.term,
          period: "期末"
        })
      );
    } else if (data.period === "期中") {
      return updateDateStateWithSession(
        api.zf.midtermscoreInfo,
        data,
        "setScoreInfo",
        (res) => ({
          scoreInfo: res.data.data,
          year: data?.year,
          term: data?.term,
          period: "期中"
        })
      );
    }
  }

  static getScoreInfo(
    data: { year: string; term: string, period: "期中" | "期末" | "" }
  ): {
      data: Score[];
      updateTime: Date | null;
    } {
    if (!serviceStore?.zf.scoreInfo[data.year])
      return { data: [], updateTime: null };
    if (!serviceStore?.zf.scoreInfo[data.year][data.term])
      return { data: [], updateTime: null };
    if (!serviceStore?.zf.scoreInfo[data.year][data.term][data.period]?.data)
      return { data: [], updateTime: null };
    return serviceStore?.zf.scoreInfo[data.year][data.term][data.period];
  }

  static async getFreeRoomInfo(data: {
    year: string;
    term: string;
    campus: string;
    weekday: string;
    sections: string;
    week: string;
  }) {
    return updateDateStateWithSession(api.zf.freeroom, data, "setRoomInfo");
  }

  static getDayLessonTable(day: "today" | "tomorrow") {
    const lessonsTable = this.getLessonTable();
    const lessons = lessonsTable?.filter((item: Lesson) => {
      /** 周日值为 7，周一值为 1 */
      let queryDay: number = 1;
      /** 当前学期的第几周 */
      let queryWeek: number = 1;

      if (day === "today") {
        queryDay = new Date().getDay() || 7;
        queryWeek = systemStore.generalInfo.week;
      } else if (day === "tomorrow") {
        queryDay = new Date().getDay() + 1;
        if (queryDay === 1) {
          // 如果明天是周一，意味着要查询下一周
          queryWeek = systemStore.generalInfo.week + 1;
        } else {
          queryWeek = systemStore.generalInfo.week;
        }
      }

      if (queryDay !== parseInt(item.weekday)) return false;

      for (const time of item.week.split(",")) {
        if (time.includes("-")) {
          const start = parseInt(time.split("-")[0]);
          const end = parseInt(time.split("-")[1]);
          if (queryWeek <= end && queryWeek >= start)
            if (!time.includes("单") && !time.includes("双")) return true;
            else if (time.includes("单") && queryWeek % 2 === 1) return true;
            else if (time.includes("双") && queryWeek % 2 === 0) return true;
        } else if (queryWeek === parseInt(time)) return true;
      }
      return false;
    });

    return lessons;
  }

  /**
   * 从缓存中取出课表
   * @param data 学期信息
   * @returns 该学期课表
   */
  static getLessonTable(data?: {
    year: string;
    term: string;
  }): Lesson[] | undefined {
    if (!data) {
      data = {
        year: systemStore.generalInfo?.termYear,
        term: systemStore.generalInfo?.term
      };
    }
    if (!serviceStore?.zf.lessonsTableInfo[data.year]) return undefined;
    if (!serviceStore?.zf.lessonsTableInfo[data.year][data.term])
      return undefined;
    return (
      serviceStore?.zf.lessonsTableInfo[data.year][data.term]?.data
        ?.lessonsTable || []
    );
  }

  /**
   * 从缓存中获取 **实践** 课表
   * @Deprecated 无此需求，没使用过
   * @param 学期信息
   * @returns
   */
  static getPracticeLessonsTable(data?: {
    year: string;
    term: string;
  }): PracticeLesson[] {
    if (!data) {
      data = {
        year: systemStore.generalInfo?.termYear,
        term: systemStore.generalInfo?.term
      };
    }
    if (!serviceStore?.zf.lessonsTableInfo[data.year]) return [];
    return (
      serviceStore?.zf.lessonsTableInfo[data.year][data.term]?.data
        ?.practiceLessons || []
    );
  }
}
