// 获取大众周 add by dongpf
export const getWeek = function (date) {
  let weekOfYear = 0
  let dateStr = date
  let dateBiao = new Date(date)
  let theYear = dateBiao.getFullYear()
  let dayTh = Math.ceil((dateBiao - new Date(theYear.toString())) / (24 * 60 * 60 * 1000)) + 1
  let dateNewYear = new Date(theYear.toString() + '-1-1')
  let dateLastNewYear = new Date((theYear - 1).toString() + '-1-1')
  let dateOfLastDay = new Date(theYear.toString() + '-12-31')
  let weekOfLastDay = dateOfLastDay.getDay()
  let inItsselfYear = true
  let NUM4 = 4
  let NUM5 = 5
  let NUM7 = 7
  let NUM2 = 2
  let NUM3 = 3
  let NUM52 = 52
  let NUM53 = 53
  let NUM365 = 365
  let NUM3600 = 3600
  let NUM24 = 24
  let NUM1000 = 1000
  let NUM10 = 10
  if (weekOfLastDay < NUM4) {
    inItsselfYear = false
  }
  let weekOfNewYear = dateNewYear.getDay()
  let weekOfLastNewYear = dateLastNewYear.getDay()
  let difNewYear = Math.floor((dateBiao.getTime() - dateNewYear.getTime()) / (NUM3600 * NUM24 * NUM1000))
  let difLastDay = Math.floor((dateOfLastDay.getTime() - dateBiao.getTime()) / (NUM3600 * NUM24 * NUM1000))
  if (weekOfNewYear < NUM4) {
    let temp = NUM7 - weekOfNewYear
    if (difNewYear >= 0 && difNewYear <= (temp - 1)) {
      weekOfYear = 1
    } else if (difNewYear > (temp - 1)) {
      if (inItsselfYear) {
        weekOfYear = Math.floor((dayTh - temp - 1) / NUM7 + NUM2)
      } else { // 该年末是下一年的第一周(即年末为周日，周一，周二)
        if (difLastDay >= weekOfLastDay + 1) {
          weekOfYear = Math.floor((dayTh - temp - 1) / NUM7 + NUM2)
        } else { // 日期与年末 是同一周，为下一年的第一周
          theYear = theYear + 1
          weekOfYear = 1
        }
      }
    }
  } else {
    let difTemp = 1
    switch (weekOfNewYear) {
    case NUM4:
      difTemp = NUM3
      break
    case NUM5:
      difTemp = NUM2
      break
    default:
      break
    }

    if (difNewYear < difTemp) {
      theYear = theYear - 1
      weekOfYear = NUM52
      if (NUM3 === weekOfLastNewYear) {
        weekOfYear = NUM53
      } else {
        // let leapYear = getDuration(dateLastNewYear.getTime(), dateNewYear.getTime())
        let leapYear = Math.floor((dateNewYear.getTime() - dateLastNewYear.getTime()) / (NUM3600 * NUM24 * NUM1000))
        if (NUM365 === leapYear && NUM2 === weekOfLastNewYear) { // 元旦为周三 或者 周四(周四在if中判断了，故不用再判断)
          weekOfYear = NUM53
        }
      }
    } else {
      if (inItsselfYear) {
        weekOfYear = Math.floor((dayTh - difTemp - 1) / NUM7 + 1)
      } else {
        if (difLastDay >= weekOfLastDay + 1) {
          weekOfYear = Math.floor((dayTh - difTemp - 1) / NUM7 + 1)
        } else {
          theYear = theYear + 1
          weekOfYear = 1
        }
      }
    }
  }

  let weekOfYearString = weekOfYear.toString()
  let week = weekOfYear
  if (week < NUM10) {
    weekOfYearString = '0' + week
  }
  let returnString = theYear + '-KW' + weekOfYearString
  return weekOfYearString
}
export const getWeeks = function (value) {
  let dateStr = value.substring(0, 10) // 如果传入的参数是含有时分秒的字符串（如"2017-09-20 17:39:00"）截取日期
  let allDate = new Date(dateStr)
  let lastM = allDate.getMonth() // 月
  let lastD = allDate.getDate() // 当前日
  let lastDD = allDate.getDay() // 当前星期
  let y = allDate.getFullYear() // 完整年份
  let yWeek // 当前周
  let yDate = new Date(allDate.getFullYear(), allDate.getMonth(), allDate.getDate())
  // 获取实际一年中的第一天是几号
  let firstDate = getFirstDate(allDate.getFullYear(), allDate.getMonth(), allDate.getDate())
  let firstM = firstDate.getMonth()
  let firstD = firstDate.getDate()
  let firstDD = firstDate.getDay()
  let thisDays = (yDate - firstDate) / 86400000 + 1
  if (firstM == 0 && firstD == 1) {
    if (firstDD == 0) {
      yWeek = getISOWeekAll(firstDate.getFullYear() - 1)
      y = y - 1// 年需要减去1  added by lvdk 20120723
    } else if (firstDD == 1) {
      yWeek = 1
    }
  } else {
    if (thisDays > 0) {
      if (lastM == 11 && lastD == 31) {
        if (lastDD == 0) {
          yWeek = getISOWeekAll(firstDate.getFullYear())
        } else if (lastDD == 1) {
          yWeek = 1
          y = y + 1
        } else {
          yWeek = Math.ceil(thisDays / 7)
        }
      } else {
        yWeek = Math.ceil(thisDays / 7)
        let c = thisDays % 7
        if (c == 0) {
          yWeek = yWeek
        } else {
          if (lastDD == 0) {
            yWeek = yWeek - 1
          }
        }
      }
    } else {
      yWeek = getISOWeekAll(firstDate.getFullYear() - 1)
      y = y - 1
    }
  }
  return yWeek // 返回正确的大众周
}

export const getFirstDate = function (y, m, d) {
  // 1月1号
  let firDate
  let firstdate = new Date(y, 0, 1)
  // 计算年头
  let firstDay = firstdate.getDay()
  if (firstDay == 0) firstDay = +7
  if (firstDay > 4) {
    if (firstDay == 7 && m == 0 && d == 1) {
      firDate = new Date(y, 0, 1)
    } else {
      d = 1 + (8 - firstDay)
      firDate = new Date(y, 0, d)
    }
  } else {
    if (firstDay == 1 && m == 0 && d == 1) {
      firDate = new Date(y, 0, 1)
    } else {
      d = 31 - (firstDay - 1)
      firDate = new Date((y - 1), 11, d)
    }
  }
  return firDate
}
// 按照一汽大众的业务逻辑计算每年的实际总周数
export const getISOWeekAll = function () {
  // 1月1号
  let firstDate = new Date(y, 0, 1)
  // 12月31号
  let lastDate = new Date(y, 11, 31)
  // 计算一年的总天数
  let countDay = (lastDate - firstDate) / 86400000 + 1
  // 计算年头
  let firstDay = firstDate.getDay()
  if (firstDay == 0) firstDay = +7
  if (firstDay > 4) {
    countDay = countDay - (8 - firstDay)
  } else {
    countDay = (countDay - 1) + firstDay
  }
  // 计算年尾
  let lastDay = lastDate.getDay()
  if (lastDay == 0) lastDay = +7
  if (lastDay > 3) {
    countDay = countDay + (7 - lastDay)
  } else {
    countDay = countDay - lastDay
  }
  let yWeekCount = countDay / 7
  return yWeekCount
}
