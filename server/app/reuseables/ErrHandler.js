function errHandler(err,res) {
    console.log(err)
    res.status(500).send({bool: false})
}

module.exports={errHandler}