async function GetReviews(req,res)  {
    let {id} = req.query;

    NeonDB.then((pool) => 
        pool.query(`select * from reviews where seller_id = '${id}'`)
        .then(result => res.send(result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

module.exports={
    GetReviews
}