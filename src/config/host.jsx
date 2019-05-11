export const Host = {
    github : "https://github.com/xxx407410849",
    blog : "//www.404lancelot.cn",
    //域名
    prodHost : {
        nodeHost : "//127.0.0.1:3000/getData",
        //nodeHost : "118.24.39.81:3000"
    },
    //接口
    hosts : {
        //权限验证，session验证是否登陆
        authorCheck : "/author",
        //登陆验证
        login : "/login",
        //登出
        loginout : "/login/out",
        //修改密码
        changeCode : "/changeCode",
        //查找考试分组列表
        findExam : "/exam",
        //设置考试分组
        setExam : "/exam/add",
        //删除考试批次
        deleteExam : "/exam/delete",
        //查找考试分组名字
        getClassName : "/exam/name",
        //设置考试科目
        setSub : "/sub/add",
        //查找批次
        getRound : "/exam/round",
        //删除学生
        deleteStu : "/stu/delete",
        //上传学生表
        importStu : "/stu/import",
        //查找学生表
        getStu : "/stu/get",
        //查找教师表
        getTeacher : "/teacher/get",
        //删除教师
        deleteTeacher : "/teacher/delete",
        //上传老师表
        importTeacher : "/teacher/import",
        //获得完整成绩信息(需要班级key值)
        getScore : "/score/get",
        //获得完整班级信息
        getClassInfo : "/exam/sub",
        //上传成绩表
        importScore : "/score/import",
        //查找所有学生的学号
        getStuId : "/stu/id",
        //查找单个学生的成绩
        getStuScore : "/score/stu",
        //查找单个学生的信息
        getStuInfo : "/stu/info"
    }
}