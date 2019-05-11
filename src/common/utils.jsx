import fetch from './fetch.jsx';
import {
    Host
} from '../config/host.jsx'
import md5 from 'js-md5'
import XLSX from 'xlsx'
import {saveAs} from 'file-saver'
export default {
    //url解析
    urlParse: (setUrl) => {
        let url = location.search;
        if (setUrl) url = setUrl.split('?')[1];
        let parseArray = {};
        url.replace("?", "").split("&").forEach((data) => {
            let key = data.split("=")[0];
            let value = data.split("=")[1];
            if (parseArray[key]) {
                parseArray[key] = [...parseArray[key], value];
            } else {
                parseArray[key] = value;
            }
        });
        return parseArray;
    },
    //json解析成excel
    excelParse: (orignData, fileName = "index") => {
        //避免操纵原json
        let data = [...orignData];
        // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
        const getCharCol = (n) => {
            let s = "",
                m = 0;
            while (n > 0) {
                m = n % 26 + 1
                s = String.fromCharCode(m + 64) + s
                n = (n - m) / 26
            }
            return s
        };
        //字符串转字符流
        const stringToArrayBuffer = (s) => {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        };
        var keys = Object.keys(data[0]);
        //插入表头
        var firstRow = {};
        keys.forEach(function (item) {
            firstRow[item] = item;
        });
        data.unshift(firstRow);
        var content = {};

        // 把json格式的数据转为excel的行列形式
        var sheetsData = data.map(function (item, rowIndex) {
            return keys.map(function (key, columnIndex) {
                return Object.assign({}, {
                    value: item[key],
                    position: (columnIndex > 25 ? getCharCol(columnIndex) : String.fromCharCode(65 + columnIndex)) + (rowIndex + 1),
                });
            });
        }).reduce(function (prev, next) {
            return prev.concat(next);
        });

        sheetsData.forEach(function (item, index) {
            content[item.position] = {
                v: item.value
            };
        });

        //设置区域,比如表格从A1到D10,SheetNames:标题，
        var coordinate = Object.keys(content);
        var workBook = {
            SheetNames: ["helloSheet"],
            Sheets: {
                "helloSheet": Object.assign({}, content, {
                    "!ref": coordinate[0] + ":" + coordinate[coordinate.length - 1]
                }),
            }
        };
        //这里的数据是用来定义导出的格式类型
        var excelData = XLSX.write(workBook, {
            bookType: "xlsx",
            bookSST: false,
            type: "binary"
        });
        var blob = new Blob([stringToArrayBuffer(excelData)], {
            type: ""
        });
        saveAs(blob, `${fileName}.xlsx`);
    },
    mixedScore : (array) => {
        let key = array[0].examId.slice(-2);
        let newArray = [...array];
        for (let index = 0; index < newArray.length; index++) {
            const item = newArray[index];
            if(item.calScore != "-1"){
                switch (item.subSort) {
                    case "科目一":
                        item.mixedScore = item.calScore * 0.05;
                        break;
                    case "科目二":
                        item.mixedScore = item.calScore * 0.2;
                        break;
                    case "科目三":
                        if(key[0] === "U"){
                            item.mixedScore = item.calScore * 0.2;
                        }else{
                            item.mixedScore = item.calScore * 0.15;
                        }
                        break;
                    case "科目四":
                        if(key[0] === "U"){
                            item.mixedScore = item.calScore * 0.3;
                        }else{
                            item.mixedScore = item.calScore * 0.15;
                        }
                        break;
                    case "科目五":
                        item.mixedScore = item.calScore * 0.2;
                        break;
                    case "科目六":
                        if(key[0] === "U"){
                            item.mixedScore = item.calScore * 0.05;
                        }else{
                            item.mixedScore = item.calScore * 0.2;
                        }
                        break;
                    case "科目七":
                        item.mixedScore = item.calScore * 0.05;
                        break;
                    default:
                        break;
                }
            }else{
                item.mixedScore = -1;
            }  
        }
        console.log(newArray);
        return newArray;
    }
}