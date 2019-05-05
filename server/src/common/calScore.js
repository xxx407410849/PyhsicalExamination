/**
 * @param {学生id} stuId 
 * @param {计算前的成绩} score 
 * @param {项目名} subName
 * @param {回调函数,传入errmsg和res} callBack
 */
var Student = require('../model/studentModal');
const calScore = (stuId, score, subName, callBack) => {
    if (!score) {
        callBack("成绩值有误");
        return;
    }
    if (parseInt(score) === -1) {
        callBack(null, -1);
        return;
    }
    Student.findOne({
        "id": stuId
    }, (err, stuData) => {
        if (err || !stuData) {
            callBack("学生信息有误");
        } else {
            let {
                age,
                type,
                sex
            } = stuData;
            let resScore = 0;
            if (type === "初训") {
                if (sex === "女") {
                    //初训女评分换算
                    switch (subName) {
                        case "BMI指数":
                            score = 10 * parseFloat(score);
                            resScore = 100 - Math.abs(score - 210);
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "跪姿俯卧撑":
                            score = parseInt(score);
                            resScore = 100 - (35 - score) * 5;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "25KG卧推":
                            score = parseInt(score);
                            resScore = 100 - (17 - score) * 5;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "仰卧收腹举腿":
                            score = parseInt(score);
                            resScore = 100 - (32 - score) * 5;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "立定跳远":
                            score = parseFloat(score) * 100;
                            resScore = 100 - (222 - score);
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "前抛实心球":
                            score = parseFloat(score) * 10;
                            resScore = 100 - (76 - score) * 2.5;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "T形跑":
                            score = parseFloat(score) * 10;
                            resScore = 100 - (score - 309) * 2.5;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "100米跑":
                            score = parseFloat(score) * 10;
                            resScore = 100 - (score - 152) * 5 / 3;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "25米折返跑":
                            score = parseFloat(score) * 10;
                            resScore = 100 - (score - 380) * 5 / 3;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "1500米跑":
                            if (typeof (score) != "string" || score.indexOf(":") === -1) {
                                callBack("请正确设置时间，并以:分割");
                                break;
                            }
                            score = parseInt(score.split(":")[0]) * 60 + parseInt(score.split(":")[1]);
                            resScore = 100 - (score - 430) / 2;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "平衡垫测试":
                            score = parseInt(score);
                            resScore = 100 - (11 - score) * 5;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "15kg杠铃快挺":
                            score = parseInt(score);
                            resScore = 100 - (24 - score) * 5;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "40kg杠铃硬拉":
                            score = parseInt(score);
                            resScore = 100 - (23 - score) * 5;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        default:
                            callBack("项目名有误");
                            break;
                    }
                } else if (sex === "男") {
                    //初训男换算
                    switch (subName) {
                        case "BMI指数":
                            score = 10 * parseFloat(score);
                            resScore = 100 - Math.abs(score - 210);
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "引体向上":
                            score = parseInt(score);
                            resScore = 100 - (18 - score) * 5;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "双杠屈臂撑":
                            score = parseInt(score);
                            resScore = 100 - (28 - score) * 5;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "50kg卧推":
                            //非等差
                            score = parseInt(score);
                            if (score >= 22) {
                                resScore = 100 - (25 - score) * 5;
                            } else if (score <= 12) {
                                resScore = 60 - (12 - score) * 5;
                            } else {
                                resScore = 85 - (22 - score) * 2.5;
                            }
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "仰卧收腹举腿":
                            score = parseInt(score);
                            resScore = 100 - (42 - score) * 5;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "三级蛙跳":
                            //非等差
                            score = parseFloat(score) * 10;
                            if (score >= 84) {
                                resScore = 100 - (86 - score) * 5;
                            } else {
                                resScore = 90 - (84 - score) * 2.5;
                            }
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "T形跑":
                            //非等差
                            score = parseFloat(score) * 10;
                            if (score <= 224) {
                                resScore = 100 - (score - 222) * 2.5;
                            } else if (score >= 240) {
                                resScore = 75 - (score - 240);
                            } else {
                                resScore = 95 - (score - 224) / 4 * 5;
                            }
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "100米跑":
                            //非等差
                            score = parseFloat(score) * 10;
                            if (score <= 128) {
                                resScore = 100 - (score - 125) / 3 * 5;
                            } else if (score > 128 && score <= 136) {
                                resScore = 90 - (score - 132) * 2.5;
                            } else if (score > 136 && score <= 140) {
                                resScore = 80 - (score - 136) / 4 * 5;
                            } else {
                                resScore = 75 - (score - 140) * 2.5
                            }
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "25米折返跑":
                            //非等差
                            score = parseFloat(score) * 10;
                            if (score <= 350) {
                                resScore = 100 - (score - 346) * 2.5;
                            } else if (score > 350 && score <= 354) {
                                resScore = 90 - (score - 350) * 5 / 4;
                            } else if (score > 354 && score <= 360) {
                                resScore = 85 - (score - 354) * 2.5;
                            } else {
                                resScore = 70 - (score - 360);
                            }
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "3000米跑":
                            //非等差
                            if (typeof (score) != "string" || score.indexOf(":") === -1) {
                                callBack("请正确设置时间，并以:分割");
                                break;
                            }
                            score = parseInt(score.split(":")[0]) * 60 + parseInt(score.split(":")[1]);
                            console.log(score);
                            if (score <= 730) {
                                resScore = 100 - (score - 720) / 2;
                            } else {
                                resScore = 95 - (score - 730) / 4;
                            }
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "平衡垫测试":
                            score = parseInt(score);
                            resScore = 100 - (11 - score) * 5;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "负重折返":
                            score = parseInt(score);
                            resScore = 100 - (score - 19) * 5;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "90kg杠铃硬拉":
                            score = parseInt(score);
                            resScore = 100 - (23 - score) * 5;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        case "25kg杠铃快挺":
                            score = parseInt(score);
                            resScore = 100 - (40 - score) * 5;
                            resScore = resScore > 100 ? 100 : resScore;
                            callBack(null, resScore > 0 ? resScore : 0);
                            break;
                        default:
                            callBack("项目名有误");
                            console.log(subName);
                            break;
                    }
                } else {
                    callBack("学生性别设置有误");
                }
            } else if (type === "复训") {
                if (sex === "男") {
                    if (age <= 35) {
                        //复训35以下男换算
                        switch (subName) {
                            case "BMI指数":
                                score = 10 * parseFloat(score);
                                resScore = 100 - Math.abs(score - 210);
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "引体向上":
                                score = parseInt(score);
                                if (age <= 25) {
                                    resScore = 100 - (17 - score) * 5;
                                } else if (age > 25 && age <= 30) {
                                    resScore = 100 - (16 - score) * 5;
                                } else {
                                    resScore = 100 - (15 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "双杠屈臂撑":
                                score = parseInt(score);
                                if (age <= 25) {
                                    if (score >= 24) {
                                        resScore = 100 - (27 - score) * 5;
                                    } else if (score < 24 && score >= 14) {
                                        resScore = 85 - (24 - score) * 2.5;
                                    } else {
                                        resScore = 60 - (14 - score) * 5
                                    }
                                } else if (age > 25 && age <= 30) {
                                    if (score >= 23) {
                                        resScore = 100 - (26 - score) * 5;
                                    } else if (score < 23 && score >= 13) {
                                        resScore = 85 - (23 - score) * 2.5;
                                    } else {
                                        resScore = 60 - (13 - score) * 5
                                    }
                                } else {
                                    if (score >= 22) {
                                        resScore = 100 - (25 - score) * 5;
                                    } else if (score < 22 && score >= 12) {
                                        resScore = 85 - (22 - score) * 2.5;
                                    } else {
                                        resScore = 60 - (12 - score) * 5
                                    }
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "50kg卧推":
                                score = parseInt(score);
                                if (age <= 25) {
                                    resScore = 100 - (21 - score) * 5;
                                } else if (age > 25 && age <= 30) {
                                    resScore = 100 - (22 - score) * 5;
                                } else {
                                    resScore = 100 - (19 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "仰卧收腹举腿":
                                score = parseInt(score);
                                if (age <= 25) {
                                    resScore = 100 - (41 - score) * 5;
                                } else if (age > 25 && age <= 30) {
                                    resScore = 100 - (40 - score) * 5;
                                } else {
                                    resScore = 100 - (39 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "三级蛙跳":
                                //非等差
                                score = parseFloat(score) * 10;
                                if (age <= 25) {
                                    if (score >= 82) {
                                        resScore = 100 - (84 - score) * 5;
                                    } else {
                                        resScore = 90 - (82 - score) * 2.5;
                                    }
                                } else if (age > 25 && age <= 30) {
                                    if (score >= 80) {
                                        resScore = 100 - (82 - score) * 5;
                                    } else {
                                        resScore = 90 - (80 - score) * 2.5;
                                    }
                                } else {
                                    if (score >= 80) {
                                        resScore = 100 - (81 - score) * 5;
                                    } else {
                                        resScore = 95 - (80 - score) * 2.5;
                                    }
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "T形跑":
                                //非等差
                                score = parseFloat(score) * 10;
                                if (age <= 25) {
                                    if (score <= 240) {
                                        resScore = 100 - (score - 224) / 4 * 5;
                                    } else {
                                        resScore = 80 - (score - 240);
                                    }
                                } else if (age > 25 && age <= 30) {
                                    if (score <= 240) {
                                        resScore = 100 - (score - 232) / 4 * 5;
                                    } else {
                                        resScore = 90 - (score - 240);
                                    }
                                } else {
                                    if (score <= 245) {
                                        resScore = 100 - (score - 236) / 9 * 5;
                                    } else if (score > 245 && score <= 280) {
                                        resScore = 95 - (score - 245);
                                    } else {
                                        resScore = 60 - (score - 280) / 2;
                                    }
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "100米跑":
                                //非等差
                                score = parseFloat(score) * 10;
                                if (age <= 25) {
                                    if (score <= 132) {
                                        resScore = 100 - (score - 128) / 4 * 5;
                                    } else if (score > 132 && score <= 136) {
                                        resScore = 95 - (score - 132) * 2.5;
                                    } else if (score > 136 && score <= 140) {
                                        resScore = 85 - (score - 136) / 4 * 5;
                                    } else {
                                        resScore = 80 - (score - 140) * 2.5
                                    }
                                } else if (age > 25 && age <= 30) {
                                    if (score <= 136) {
                                        resScore = 100 - (score - 132) * 2.5;
                                    } else if (score > 136 && score <= 140) {
                                        resScore = 90 - (score - 136) * 5 / 4;
                                    } else if (score > 140 && score <= 152) {
                                        resScore = 85 - (score - 140) * 2.5;
                                    } else {
                                        resScore = 55 - (score - 152) * 5
                                    }
                                } else {
                                    resScore = 100 - (19 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "25米折返跑":
                                //非等差
                                score = parseFloat(score) * 10;
                                if (age <= 25) {
                                    if (score <= 360) {
                                        resScore = 100 - (score - 352) * 2.5;
                                    } else {
                                        resScore = 80 - (score - 360);
                                    }
                                } else if (age > 25 && age <= 30) {
                                    if (score <= 370) {
                                        resScore = 100 - (score - 362) * 2.5;
                                    } else {
                                        resScore = 80 - (score - 370);
                                    }
                                } else {
                                    if (score <= 380) {
                                        resScore = 100 - (score - 372) * 2.5;
                                    } else {
                                        resScore = 80 - (score - 380);
                                    }
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "3000米跑":
                                //非等差
                                if (typeof (score) != "string" || score.indexOf(":") === -1) {
                                    callBack("请正确设置时间，并以:分割");
                                    break;
                                }
                                score = String(score);
                                score = parseInt(score.split(":")[0]) * 60 + parseInt(score.split(":")[1]);
                                if (age <= 25) {
                                    if(score <= 740){
                                        resScore = 100 - (score - 730) / 2;
                                    }else{
                                        resScore = 95 - (score - 740) / 4;
                                    }
                                } else if (age > 25 && age <= 30) {
                                    if(score <= 750){
                                        resScore = 100 - (score - 740) / 2;
                                    }else{
                                        resScore = 95 - (score - 750) / 4;
                                    }
                                } else {
                                    resScore = 100 - (score - 760) / 4;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "平衡垫测试":
                                score = parseInt(score);
                                resScore = 100 - (11 - score) * 5;
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "负重折返":
                                score = parseInt(score);
                                if (age <= 25) {
                                    resScore = 100 - (score - 20) * 5;
                                } else if (age > 25 && age <= 30) {
                                    resScore = 100 - (score - 22) * 5;
                                } else {
                                    resScore = 100 - (score - 24) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "90kg杠铃硬拉":
                                score = parseInt(score);
                                if (age <= 25) {
                                    resScore = 100 - (24 - score) * 5;
                                } else if (age > 25 && age <= 30) {
                                    resScore = 100 - (25 - score) * 5;
                                } else {
                                    resScore = 100 - (22 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "25kg杠铃快挺":
                                score = parseInt(score);
                                if (age <= 25) {
                                    resScore = 100 - (39 - score) * 5;
                                } else if (age > 25 && age <= 30) {
                                    resScore = 100 - (38 - score) * 5;
                                } else {
                                    resScore = 100 - (36 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            default:
                                callBack("项目名有误");
                                console.log(subName);
                                break;
                        }
                    } else if (age > 35) {
                        //复训35岁以上男
                        switch (subName) {
                            case "BMI指数":
                                score = 10 * parseFloat(score);
                                if (age >= 36 && age <= 40) {
                                    if (score = 210) {
                                        resScore = 100;
                                    } else if (score > 210 && score <= 225) {
                                        resScore = 100 - (score - 210) / 3;
                                    } else if (score > 225) {
                                        resScore = 95 - (score - 225);
                                    } else if (score < 210 && score >= 195) {
                                        resScore = 100 - (210 - score) / 3;
                                    } else {
                                        resScore = 95 - (195 - score);
                                    }
                                } else if (age >= 41 && age <= 45) {
                                    if (score = 215) {
                                        resScore = 100;
                                    } else if (score > 215 && score <= 225) {
                                        resScore = 100 - (score - 215) / 2;
                                    } else if (score > 225) {
                                        resScore = 95 - (score - 225);
                                    } else if (score < 215 && score >= 195) {
                                        resScore = 100 - (215 - score) / 4;
                                    } else {
                                        resScore = 95 - (195 - score);
                                    }
                                } else if (age >= 46 && age <= 50) {
                                    if (score = 220) {
                                        resScore = 100;
                                    } else if (score > 220 && score <= 230) {
                                        resScore = 100 - (score - 220) / 2;
                                    } else if (score > 230) {
                                        resScore = 95 - (score - 230);
                                    } else if (score < 220 && score >= 190) {
                                        resScore = 100 - (220 - score) / 6;
                                    } else {
                                        resScore = 95 - (190 - score);
                                    }
                                } else {
                                    if (score = 225) {
                                        resScore = 100;
                                    } else if (score > 225 && score <= 235) {
                                        resScore = 100 - (score - 225) / 2;
                                    } else if (score > 235) {
                                        resScore = 95 - (score - 230);
                                    } else if (score < 225 && score >= 185) {
                                        resScore = 100 - (225 - score) / 6;
                                    } else {
                                        resScore = 95 - (185 - score);
                                    }
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "仰卧收腹举腿":
                                score = parseInt(score);
                                if (age >= 36 && age <= 40) {
                                    resScore = 100 - (38 - score) * 5;
                                } else if (age >= 41 && age <= 45) {
                                    resScore = 100 - (36 - score) * 5;
                                } else if (age >= 46 && age <= 50) {
                                    resScore = 100 - (34 - score) * 5;
                                } else {
                                    if (score >= 31) {
                                        resScore = 100 - (33 - score) * 2.5;
                                    } else {
                                        resScore = 95 - (31 - score) * 5;
                                    }
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "3000米跑":
                                if (typeof (score) != "string" || score.indexOf(":") === -1) {
                                    callBack("请正确设置时间，并以:分割");
                                    break;
                                }
                                score = parseInt(score.split(":")[0]) * 60 + parseInt(score.split(":")[1]);
                                if (age >= 36 && age <= 40) {
                                    resScore = 100 - (score - 820) / 4;
                                } else if (age >= 41 && age <= 45) {
                                    resScore = 100 - (score - 880) / 4;
                                } else if (age >= 46 && age <= 50) {
                                    resScore = 100 - (score - 1000) / 4;
                                } else {
                                    resScore = 100 - (score - 1120) / 4;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "平衡垫测试":
                                score = parseInt(score);
                                resScore = 100 - (11 - score) * 5;
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "引体向上":
                                score = parseInt(score);
                                if (age >= 36 && age <= 40) {
                                    resScore = 100 - (14 - score) * 5;
                                } else if (age >= 41 && age <= 45) {
                                    resScore = 100 - (13 - score) * 5;
                                } else if (age >= 46 && age <= 50) {
                                    resScore = 100 - (12 - score) * 5;
                                } else {
                                    resScore = 100 - (11 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "50kg卧推":
                                score = parseInt(score);
                                if (age >= 36 && age <= 40) {
                                    resScore = 100 - (18 - score) * 5;
                                } else if (age >= 41 && age <= 45) {
                                    resScore = 100 - (17 - score) * 5;
                                } else if (age >= 46 && age <= 50) {
                                    resScore = 100 - (16 - score) * 5;
                                } else {
                                    resScore = 100 - (15 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "前抛实心球":
                                score = parseFloat(score) * 10;
                                if (age >= 36 && age <= 40) {
                                    if (score >= 110) {
                                        resScore = 100 - (126 - score) * 2.5;
                                    } else {
                                        resScore = 60 - (110 - score) * 5 / 4;
                                    }
                                } else if (age >= 41 && age <= 45) {
                                    if (score >= 106) {
                                        resScore = 100 - (122 - score) * 2.5;
                                    } else {
                                        resScore = 60 - (106 - score) * 5 / 4;
                                    }
                                } else if (age >= 46 && age <= 50) {
                                    if (score >= 102) {
                                        resScore = 100 - (118 - score) * 2.5;
                                    } else {
                                        resScore = 60 - (102 - score) * 5 / 4;
                                    }
                                } else {
                                    if (score >= 104) {
                                        resScore = 100 - (116 - score) * 2.5;
                                    } else if (score < 104 && score >= 100) {
                                        resScore = 70 - (104 - score) * 5 / 4;
                                    } else if (score < 100 && score >= 98) {
                                        resScore = 65 - (100 - score) * 2.5;
                                    } else {
                                        resScore = 60 - (98 - score) * 5 / 4;
                                    }
                                }
                            case "25kg杠铃快挺":
                                score = parseInt(score);
                                if (age >= 36 && age <= 40) {
                                    resScore = 100 - (34 - score) * 5;
                                } else if (age >= 41 && age <= 45) {
                                    resScore = 100 - (32 - score) * 5;
                                } else if (age >= 46 && age <= 50) {
                                    resScore = 100 - (30 - score) * 5;
                                } else {
                                    if (score >= 22) {
                                        resScore = 100 - (29 - score) * 5;
                                    } else {
                                        resScore = 65 - (22 - score) * 2.5
                                    }
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            default:
                                callBack("项目名设置有误");
                                console.log(subName);
                                break;
                        }
                    } else {
                        callBack("学生年龄设置有误");
                    }
                } else if (sex === "女") {
                    if (age <= 35) {
                        //35以下复训女
                        switch (subName) {
                            case "BMI指数":
                                score = 10 * parseFloat(score);
                                resScore = 100 - Math.abs(score - 210);
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "仰卧收腹举腿":
                                score = parseInt(score);
                                if (age <= 25) {
                                    resScore = 100 - (31 - score) * 5;
                                } else if (age > 25 && age <= 30) {
                                    resScore = 100 - (30 - score) * 5;
                                } else {
                                    resScore = 100 - (29 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "1500米跑":
                                //非等差
                                if (typeof (score) != "string" || score.indexOf(":") === -1) {
                                    callBack("请正确设置时间，并以:分割");
                                    break;
                                }
                                score = parseInt(score.split(":")[0]) * 60 + parseInt(score.split(":")[1]);
                                if (age <= 25) {
                                    if (score <= 470) {
                                        resScore = 100 - (score - 420) / 2;
                                    } else {
                                        resScore = 75 - (score - 470) / 4;
                                    }
                                } else if (age > 25 && age <= 30) {
                                    if (score <= 480) {
                                        resScore = 100 - (score - 440) / 2;
                                    } else if (score > 480 && score <= 540) {
                                        resScore = 80 - (score - 480) / 3;
                                    } else {
                                        resScore = 60 - (score - 540) / 4;
                                    }
                                } else {
                                    if (score <= 540) {
                                        resScore = 100 - (score - 490) / 2;
                                    } else {
                                        resScore = 75 - (score - 540) / 4;
                                    }
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "平衡垫测试":
                                score = parseInt(score);
                                resScore = 100 - (11 - score) * 5;
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "跪姿俯卧撑":
                                score = parseInt(score);
                                if (age <= 25) {
                                    resScore = 100 - (33 - score) * 5;
                                } else if (age > 25 && age <= 30) {
                                    resScore = 100 - (31 - score) * 5;
                                } else {
                                    resScore = 100 - (29 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "25kg卧推":
                                score = parseInt(score);
                                if (age <= 25) {
                                    resScore = 100 - (16 - score) * 5;
                                } else if (age > 25 && age <= 30) {
                                    resScore = 100 - (15 - score) * 5;
                                } else {
                                    resScore = 100 - (14 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "立定跳远":
                                score = parseInt(score);
                                if (age <= 25) {
                                    resScore = 100 - (220 - score);
                                } else if (age > 25 && age <= 30) {
                                    resScore = 100 - (210 - score);
                                } else {
                                    resScore = 100 - (200 - score);
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "T形跑":
                                score = parseFloat(score) * 10;
                                if (age <= 25) {
                                    resScore = 100 - (score - 324) * 2.5;
                                } else if (age > 25 && age <= 30) {
                                    resScore = 100 - (score - 334) * 2.5;
                                } else {
                                    resScore = 100 - (score - 344) * 2.5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "100米跑":
                                score = parseFloat(score) * 10;
                                if (age <= 25) {
                                    if (score <= 161) {
                                        resScore = 100 - (score - 159) * 5;
                                    } else if (score > 161 && score <= 165) {
                                        resScore = 90 - (score - 161) * 2.5;
                                    } else if (score > 165 && score <= 168) {
                                        resScore = 80 - (score - 165) * 5 / 3;
                                    } else if (score > 168 && score <= 172) {
                                        resScore = 75 - (score - 168) * 5 / 4;
                                    } else if (score > 172 && score <= 178) {
                                        resScore = 70 - (score - 172) * 5 / 3;
                                    } else if (score > 178 && score <= 180) {
                                        resScore = 60 - (score - 178) * 2.5;
                                    } else {
                                        resScore = 55 - (score - 180) * 5 / 3
                                    }
                                } else if (age > 25 && age <= 30) {
                                    if (score <= 169) {
                                        resScore = 100 - (score - 165) * 5 / 4;
                                    } else {
                                        resScore = 95 - (score - 169) * 5 / 3;
                                    }
                                } else {
                                    if (score <= 178) {
                                        resScore = 100 - (score - 176) * 2.5;
                                    } else if (score > 178 && score <= 179) {
                                        resScore = 95 - (score - 178) * 5;
                                    } else if (score > 179 && score <= 181) {
                                        resScore = 90 - (score - 179) * 2.5;
                                    } else {
                                        resScore = 85 - (score - 181) * 5 / 3;
                                    }
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "25米折返跑":
                                score = parseFloat(score) * 10;
                                if (age <= 25) {
                                    resScore = 100 - (score - 392) * 5 / 3;
                                } else if (age > 25 && age <= 30) {
                                    resScore = 100 - (score - 401) * 5 / 3;
                                } else {
                                    resScore = 100 - (score - 416) * 5 / 3;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "40kg杠铃硬拉":
                                score = parseInt(score);
                                if (age <= 25) {
                                    resScore = 100 - (22 - score) * 5;
                                } else if (age > 25 && age <= 30) {
                                    resScore = 100 - (20 - score) * 5;
                                } else {
                                    resScore = 100 - (18 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "前抛实心球":
                                score = parseFloat(score) * 10;
                                if (age <= 25) {
                                    resScore = 100 - (74 - score) * 2.5;
                                } else if (age > 25 && age <= 30) {
                                    resScore = 100 - (72 - score) * 2.5;
                                } else {
                                    resScore = 100 - (70 - score) * 2.5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "15kg杠铃快挺":
                                score = parseInt(score);
                                if (age <= 25) {
                                    resScore = 100 - (23 - score) * 5;
                                } else if (age > 25 && age <= 30) {
                                    resScore = 100 - (21 - score) * 5;
                                } else {
                                    resScore = 100 - (19 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            default:
                                callBack("项目名设置有误");
                                console.log(subName);
                                break;
                        }
                    } else if (age > 35) {
                        //35岁以上复训女
                        switch (subName) {
                            case "BMI指数":
                                score = 10 * parseFloat(score);
                                if (age >= 36 && age <= 40) {
                                    if (score = 210) {
                                        resScore = 100;
                                    } else if (score > 210 && score <= 225) {
                                        resScore = 100 - (score - 210) / 3;
                                    } else if (score > 225) {
                                        resScore = 95 - (score - 225);
                                    } else if (score < 210 && score >= 195) {
                                        resScore = 100 - (210 - score) / 3;
                                    } else {
                                        resScore = 95 - (195 - score);
                                    }
                                } else if (age >= 41 && age <= 45) {
                                    if (score = 210) {
                                        resScore = 100;
                                    } else if (score > 210 && score <= 230) {
                                        resScore = 100 - (score - 210) / 4;
                                    } else if (score > 225) {
                                        resScore = 95 - (score - 225);
                                    } else if (score < 210 && score >= 190) {
                                        resScore = 100 - (210 - score) / 4;
                                    } else {
                                        resScore = 95 - (190 - score);
                                    }
                                } else if (age >= 46 && age <= 50) {
                                    if (score = 210) {
                                        resScore = 100;
                                    } else if (score > 210 && score <= 235) {
                                        resScore = 100 - (score - 210) / 5;
                                    } else if (score > 235) {
                                        resScore = 95 - (score - 235);
                                    } else if (score < 210 && score >= 185) {
                                        resScore = 100 - (210 - score) / 5;
                                    } else {
                                        resScore = 95 - (185 - score);
                                    }
                                } else {
                                    if (score = 210) {
                                        resScore = 100;
                                    } else if (score > 210 && score <= 240) {
                                        resScore = 100 - (score - 210) / 6;
                                    } else if (score > 240) {
                                        resScore = 95 - (score - 240);
                                    } else if (score < 210 && score >= 180) {
                                        resScore = 100 - (210 - score) / 6;
                                    } else {
                                        resScore = 95 - (180 - score);
                                    }
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "仰卧收腹举腿":
                                score = parseInt(score);
                                if (age >= 36 && age <= 40) {
                                    resScore = 100 - (28 - score) * 5;
                                } else if (age >= 41 && age <= 45) {
                                    resScore = 100 - (26 - score) * 5;
                                } else if (age >= 46 && age <= 50) {
                                    resScore = 100 - (24 - score) * 5;
                                } else {
                                    resScore = 100 - (22 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "1500米跑":
                                if (typeof (score) != "string" || score.indexOf(":") === -1) {
                                    callBack("请正确设置时间，并以:分割");
                                    break;
                                }
                                score = parseInt(score.split(":")[0]) * 60 + parseInt(score.split(":")[1]);
                                if (age >= 36 && age <= 40) {
                                    if (score <= 600) {
                                        resScore = 100 - (score - 550) / 2;
                                    } else {
                                        resScore = 75 - (score - 600) / 4;
                                    }
                                } else if (age >= 41 && age <= 45) {
                                    if (score <= 620) {
                                        resScore = 100 - (score - 590) / 2;
                                    } else if (score > 620 && score <= 660) {
                                        resScore = 85 - (score - 620) / 4;
                                    } else {
                                        resScore = 75 - (score - 660) / 6;
                                    }
                                } else if (age >= 46 && age <= 50) {
                                    if (score <= 670) {
                                        resScore = 100 - (score - 650) / 2;
                                    } else if (score > 670 && score <= 750) {
                                        resScore = 90 - (score - 670) / 4;
                                    } else {
                                        resScore = 70 - (score - 750) / 6;
                                    }
                                } else {
                                    if (score <= 730) {
                                        resScore = 100 - (score - 710) / 2;
                                    } else if (score > 730 && score <= 810) {
                                        resScore = 90 - (score - 730) / 4;
                                    } else {
                                        resScore = 70 - (score - 810) / 6;
                                    }
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "跪姿俯卧撑":
                                score = parseInt(score);
                                if (age >= 36 && age <= 40) {
                                    resScore = 100 - (26 - score) * 5;
                                } else if (age >= 41 && age <= 45) {
                                    resScore = 100 - (23 - score) * 5;
                                } else if (age >= 46 && age <= 50) {
                                    resScore = 100 - (20 - score) * 5;
                                } else {
                                    resScore = 100 - (17 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "平衡垫测试":
                                score = parseInt(score);
                                resScore = 100 - (11 - score) * 5;
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "25kg卧推":
                                score = parseInt(score);
                                if (age >= 36 && age <= 40) {
                                    resScore = 100 - (14 - score) * 5;
                                } else if (age >= 41 && age <= 45) {
                                    resScore = 100 - (13 - score) * 5;
                                } else if (age >= 46 && age <= 50) {
                                    resScore = 100 - (12 - score) * 5;
                                } else {
                                    resScore = 100 - (11 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "前抛实心球":
                                score = parseFloat(score) * 10;
                                if (age >= 36 && age <= 40) {
                                    resScore = 100 - (68 - score) * 2.5;
                                } else if (age >= 41 && age <= 45) {
                                    resScore = 100 - (66 - score) * 2.5;
                                } else if (age >= 46 && age <= 50) {
                                    resScore = 100 - (64 - score) * 2.5;
                                } else {
                                    resScore = 100 - (60 - score) * 2.5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            case "15kg杠铃快挺":
                                score = parseInt(score);
                                if (age >= 36 && age <= 40) {
                                    resScore = 100 - (17 - score) * 5;
                                } else if (age >= 41 && age <= 45) {
                                    resScore = 100 - (16 - score) * 5;
                                } else if (age >= 46 && age <= 50) {
                                    resScore = 100 - (15 - score) * 5;
                                } else {
                                    resScore = 100 - (14 - score) * 5;
                                }
                                resScore = resScore > 100 ? 100 : resScore;
                                callBack(null, resScore > 0 ? resScore : 0);
                                break;
                            default:
                                callBack("项目名设置有误");
                                console.log(subName);
                                break;
                        }
                    } else {
                        callBack("学生年龄设置有误");
                    }
                } else {
                    callBack("学生性别设置有误");
                }
            } else {
                callBack("学生训练类型设置有误");
            }
        }
    })
}

module.exports = {
    calScore
}