const campground = require ('./models/campground')
const comment = require ('./models/comment')


var Data = [
    {
        name:"Idanre",
        image:"https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
    },
    {
        name:"Idanre",
        image:"https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
    },
    {
        name:"Idanre",
        image:"https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
    }
]

function seeddB(){
    comment.remove({},(err)=>{
        if(err){
            console.log(err)
        }else
        {
            console.log('comments deleted')
        }
    });
   
//     campground.remove({},(err)=>{
//         if(err){
//             console.log(err)
//         }else {
//             console.log('removed campgrounds');
//             Data.forEach((seed)=>{
//                 campgorund.create(seed,(err,campgorund)=>{
//                     if (err){
//                         console.log(err)
//                     }
//                     else{
//                         console.log('campgorund created');
//                         comment.create({
//                             text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuLorem ipsum dolor sit amet, consectetur adipiscing ",
//                             author:'Lanre'
//                         },(err,comments)=>{
//                             if(err){
//                                 console.log(err)
//                             }else{
//                                 campgorund.comment.push(comments)
//                                 campgorund.save()
//                                 console.log('comment created')
//                             }
//                         })
                    
//                     }
//                 })
//             })

//         }
//     })
 }

module.exports=seeddB;