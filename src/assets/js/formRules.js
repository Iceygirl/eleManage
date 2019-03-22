// 自定义校验规则
const loginLengthValid = (rule,val,callback)=>{
    if(val.length > 30) {
        callback(new Error('长度需小于30个字符'))
    }
    callback()
}


// 登录验证
export const loginRules = {
    username:[{
        required:true,
        trigger:'blur',
        message:'请输入用户名'
    },{
        validator:loginLengthValid,
        trigger:'blur'
    }],
    password:[{
        required:true,
        trigger:'blur',
        message:'请输入密码'
    }]
}

// 添加编辑商铺字段验证
export const shopRules = {
    name:[{
        required:true,
        trigger:'blur',
        message:'请输入商铺名称'
    }],
    address:[{
        required:true,
        trigger:'blur',
        message:'请输入商铺地址'
    }],
    description:[{
        required:true,
        trigger:'blur',
        message:'请输入商铺介绍'
    }],
    phone:[{
        required:true,
        trigger:'blur',
        message:'请输入联系电话'
    }],
    category:[{
        required:true,
        trigger:'blur',
        message:'请输入店铺分类'
    }]
}

