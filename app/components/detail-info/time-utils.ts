// 시간 타입 정의
export interface TimeData {
  period: string;
  hour: string;
  minute: string;
}

// 12시간제를 24시간제로 변환 (비교용)
export const convertTo24Hour = (period: string, hour: string): number => {
  const hourNum = parseInt(hour);
  if (period === "오후" && hourNum !== 12) {
    return hourNum + 12;
  }
  if (period === "오전" && hourNum === 12) {
    return 0;
  }
  return hourNum;
};

// 시간 비교 함수 (start가 end보다 이후면 true)
export const isStartAfterEnd = (startTime: TimeData, endTime: TimeData): boolean => {
  const startHour24 = convertTo24Hour(startTime.period, startTime.hour);
  const endHour24 = convertTo24Hour(endTime.period, endTime.hour);
  const startMinute = parseInt(startTime.minute);
  const endMinute = parseInt(endTime.minute);

  if (startHour24 > endHour24) return true;
  if (startHour24 === endHour24 && startMinute >= endMinute) return true;
  return false;
};

// 시작 시간 +1시간 계산
export const addOneHour = (time: TimeData): TimeData => {
  let hour = parseInt(time.hour);
  let period = time.period;

  // hour가 0이거나 NaN인 경우 1시로 설정
  if (isNaN(hour) || hour === 0) {
    return {
      period,
      hour: "01",
      minute: time.minute,
    };
  }

  // 오전 11시 -> 오후 12시
  if (hour === 11 && period === "오전") {
    return {
      period: "오후",
      hour: "12",
      minute: time.minute,
    };
  }

  // 오후 11시 -> 오전 12시 (다음날)
  if (hour === 11 && period === "오후") {
    return {
      period: "오전",
      hour: "12",
      minute: time.minute,
    };
  }

  // 오전 12시 -> 오후 1시
  if (hour === 12 && period === "오전") {
    return {
      period: "오후",
      hour: "01",
      minute: time.minute,
    };
  }

  // 오후 12시 -> 오후 1시
  if (hour === 12 && period === "오후") {
    return {
      period: "오후",
      hour: "01",
      minute: time.minute,
    };
  }

  // 일반적인 경우: 1~10시는 단순히 +1
  hour += 1;

  return {
    period,
    hour: String(hour).padStart(2, "0"),
    minute: time.minute,
  };
};
