const axios = require("axios")
const moment = require("moment")

// 需要代挂的账号列表
var tokenList = [
  {
    token: "E09F86406CD93C1DB6BC2CE4FF113571",
    phone: "156****8413",
    userId: 212510,
  },
]

// 每日签到
function signDaily(i) {
  return new Promise((resolve) => {
    axios
      .post(
        "https://lsapp.szzgh.org:99/api/cpcfoundingappapi/userScore/addShareAndSignInScore",
        {
          sourceType: 1,
        },
        {
          insecureHTTPParser: true,
          headers: {
            Host: "lsapp.szzgh.org:99",
            Connection: "keep-alive",
            xweb_xhr: 1,
            userId: tokenList[i].userId,
            token: tokenList[i].token,
            Accept: "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
            Referer: "https://servicewechat.com/wxaea6bc6b24edf17b/8/page-frame.html",
          },
        }
      )
      .then((res) => {
        if (res.data.msg === "成功") {
          console.log(
            `\n============每日签到执行${res.data.msg}🎉${res.data.data.scoreStr} ${moment().format(
              "YYYY-MM-DD HH:mm:ss"
            )}============`
          )
        } else {
          console.log(`\n============每日签到执行${res.data.msg}❌ ${moment().format("YYYY-MM-DD HH:mm:ss")}============`)
        }
        resolve()
      })
      .catch((err) => {
        console.log(`\n每日签到执行❌ ${err.response.data}`)
        reject()
      })
  })
}

// 阅读文章
function readAddScore(i) {
  return new Promise((resolve) => {
    axios
      .post(
        "https://lsapp.szzgh.org:99/api/cpcfoundingappapi/api/dangHis/readAddScore",
        {
          id: Math.floor(Math.random() * 10) + 880, // 文章id
        },
        {
          insecureHTTPParser: true,
          headers: {
            Host: "lsapp.szzgh.org:99",
            Connection: "keep-alive",
            xweb_xhr: 1,
            userId: tokenList[i].userId,
            token: tokenList[i].token,
            Accept: "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
            Referer: "https://servicewechat.com/wxaea6bc6b24edf17b/8/page-frame.html",
          },
        }
      )
      .then((res) => {
        if (res.data.msg === "成功") {
          console.log(
            `\n============阅读任务执行${res.data.msg}🎉${res.data.data.scoreStr} ${moment().format(
              "YYYY-MM-DD HH:mm:ss"
            )}============`
          )
          resolve()
        } else {
          console.log(`\n============阅读任务执行${res.data.msg}❌ ${moment().format("YYYY-MM-DD HH:mm:ss")}============`)
          resolve()
        }
      })
      .catch((err) => {
        console.log(`\n阅读任务执行❌ ${err.response.data}`)
        reject()
      })
  })
}

// 每日答题
const answerDaily = async (i) => {
  // 获取题目
  const getList = () => {
    return new Promise((resolve) => {
      axios
        .post(
          "https://lsapp.szzgh.org:99/api/cpcfoundingappapi/api/questionLibrary/getList",
          {},
          {
            insecureHTTPParser: true,
            headers: {
              Host: "lsapp.szzgh.org:99",
              Connection: "keep-alive",
              xweb_xhr: 1,
              userId: tokenList[i].userId,
              token: tokenList[i].token,
              Accept: "*/*",
              Referer: "https://servicewechat.com/wxaea6bc6b24edf17b/8/page-frame.html",
            },
          }
        )
        .then((res) => {
          console.log(
            `\n============题目获取成功🎉${res.data.data[0].answerNumber} ${moment().format(
              "YYYY-MM-DD HH:mm:ss"
            )}============`
          )
          resolve(res.data.data)
        })
        .catch((err) => {
          console.log(`\n题目获取❌ ${err.response.data}`)
          reject()
        })
    })
  }

  const answerList = await getList()

  // 答题
  const handleAnswer = () => {
    return new Promise((resolve) => {
      for (let index = 0; index < answerList.length; index++) {
        axios
          .post(
            "https://lsapp.szzgh.org:99/api/cpcfoundingappapi/api/questionLibrary/userAnswerIsCorrect",
            {
              answer: "A",
              answerNumber: answerList[index].answerNumber,
              id: answerList[index].id,
            },
            {
              insecureHTTPParser: true,
              headers: {
                Host: "lsapp.szzgh.org:99",
                Connection: "keep-alive",
                xweb_xhr: 1,
                userId: tokenList[i].userId,
                token: tokenList[i].token,
                Accept: "*/*",
                "Content-Type": "application/x-www-form-urlencoded",
                Referer: "https://servicewechat.com/wxaea6bc6b24edf17b/8/page-frame.html",
              },
            }
          )
          .then((res) => {
            console.log(
              `\n============第${index + 1}题执行结果:${res.data.msg}🎉 ${moment().format(
                "YYYY-MM-DD HH:mm:ss"
              )}============`
            )
            if (index === answerList.length - 1) {
              resolve()
            }
          })
          .catch((err) => {
            console.log(`\n答题执行❌ ${err.response.data}`)
            reject()
          })
      }
    })
  }

  await handleAnswer()

  return new Promise((resolve) => {
    // 答题提交
    axios
      .post(
        "https://lsapp.szzgh.org:99/api/cpcfoundingappapi/api/questionLibrary/userFinishAnswer",
        {
          answerNumber: answerList[0].answerNumber,
          inviteUserId: 0,
        },
        {
          insecureHTTPParser: true,
          headers: {
            Host: "lsapp.szzgh.org:99",
            Connection: "keep-alive",
            xweb_xhr: 1,
            userId: tokenList[i].userId,
            token: tokenList[i].token,
            Accept: "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
            Referer: "https://servicewechat.com/wxaea6bc6b24edf17b/8/page-frame.html",
          },
        }
      )
      .then((res) => {
        console.log(`\n============每日答题任务执行:${res.data.msg}🎉 ${moment().format("YYYY-MM-DD HH:mm:ss")}============`)
        resolve()
      })
      .catch((err) => {
        console.log(`\n题目提交❌ ${err.response.data}`)
        reject()
      })
  })
}

// 每日分享
function shareDaily(i) {
  return new Promise((resolve) => {
    axios
      .post(
        "https://lsapp.szzgh.org:99/api/cpcfoundingappapi/userScore/addShareAndSignInScore",
        {
          sourceType: 4,
        },
        {
          insecureHTTPParser: true,
          headers: {
            Host: "lsapp.szzgh.org:99",
            Connection: "keep-alive",
            xweb_xhr: 1,
            userId: tokenList[i].userId,
            token: tokenList[i].token,
            Accept: "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
            Referer: "https://servicewechat.com/wxaea6bc6b24edf17b/8/page-frame.html",
          },
        }
      )
      .then((res) => {
        console.log(
          `\n============每日分享执行${res.data.msg}🎉${res.data.data.scoreStr} ${moment().format(
            "YYYY-MM-DD HH:mm:ss"
          )}============`
        )
        resolve()
      })
      .catch((err) => {
        console.log(`\n每日分享执行❌ ${err.response.data}`)
        reject()
      })
  })
}

// 抽奖
function handlePrize(i) {
  axios
    .post(
      "https://lsapp.szzgh.org:99/api/cpcfoundingappapi/api/lsPrizeBook/doYaoYiYao",
      {},
      {
        insecureHTTPParser: true,
        headers: {
          Host: "lsapp.szzgh.org:99",
          Connection: "keep-alive",
          xweb_xhr: 1,
          userId: tokenList[i].userId,
          token: tokenList[i].token,
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: "https://servicewechat.com/wxaea6bc6b24edf17b/8/page-frame.html",
        },
      }
    )
    .then((res) => {
      if (res.data.msg === "成功") {
        console.log(
          `\n============抽奖执行结果：${res.data.msg}🎉${res.data.data.title} ${moment().format(
            "YYYY-MM-DD HH:mm:ss"
          )}============`
        )
      } else {
        console.log(`\n============抽奖执行结果：${res.data.msg}❌ ${moment().format("YYYY-MM-DD HH:mm:ss")}============`)
      }
    })
    .catch((err) => {
      console.log(`\n抽奖执行❌ ${err.response.data}`)
      reject()
    })
}

// 执行任务
async function start() {
  for (let i = 0; i < tokenList.length; i++) {
    console.log(`\n============账号：${tokenList[i].phone}开始执行任务🔔============`)
    await signDaily(i)
    await readAddScore(i)
    await answerDaily(i)
    await shareDaily(i)
    handlePrize(i)
  }
}

start()
