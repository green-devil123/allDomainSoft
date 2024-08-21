const express = require('express');
const connection = require('./createSchema');

const app = express();

app.get("/populate", (req, res)=>{
    try{
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then(data => data.json())
        .then(data => 
            {   
                
                for(let i=0;i<data.length;i++){
                //     console.log("Inserting", data[i]);
                    const insertData = `INSERT INTO comment (postId, name, email, body) values 
                    (${data[i].postId}, "${data[i].name}", "${data[i].email}", "${data[i].body}")`
                    console.log(insertData);
                    connection.query(insertData, (err, result)=>{
                        if(err){
                            console.log(err);
                            res.send(err);
                            return
                        }
                        console.log('insert successfully')                        

                        // connection.end(err=> {if(err) return;});
                    })
                }
            }
        )
        .catch(err=> res.send(err));
    }catch(err){
        res.send(err);
    }
});

app.post("/search",(req, res)=>{
    const data = req?.body;
    const searchData = `SELECT * FROM comment WHERE name LIKE '%${data?.name}%' AND email LIKE '%${data?.email}%'
    AND body LIKE '%${data?.body}%' LIMIT 10 ORDER BY name, email, body ASC;`
    connection.query(searchData, (err, result)=>{
        if(err){
            console.log(err);
            res.send(err);
            return;
        }
        res.send(result?.data);
    })
})

app.listen(3000, ()=>{
    console.log("Server start at 3000");
})