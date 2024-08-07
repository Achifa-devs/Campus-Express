const { NeonDB } = require("../../reuseables/db");

// @@UPDATES
async function UpdatePwd(req,res) {
    let {email, pwd} = req.body;
    console.log(email,pwd)
    
    let hPwd = await bcrypt.hash(pwd, 10)

    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_sellers set password='${hPwd}' WHERE email = '${email}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}
// @@UPDATES

module.exports={
    UpdatePwd
}