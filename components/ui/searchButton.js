import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import classes from  "../ui/searchButton.module.css"


// Dummy data
//const REQUEST_URL = 'https://jonasjacek.github.io/colors/data.json';
const REQUEST_URL = process.env.NEXT_PUBLIC_SEARCH;



// class Search extends React.Component {

function Search(){
  const router =useRouter(); 
  const [search,setSearch] = useState("");
  const [data,setData] = useState([]);

  // state = {
  //   data: null,
  //   search: "",
  //   color: ""
  // }
  // fetch data

  // componentDidMount() {
  //   fetch('/api/searchcoin')
  //     .then(response => response.json())
  //     .then((data) => {this.setState(data.coinlist);console.log(data.coinlist);})
  // }

  useEffect(()=>{
    
    fetch('/api/searchcoin')
    .then(response => response.json())
    .then((data) => {setData(data.coinlist);//console.log(data.coinlist);
  })

  },[])

 
  // Search input   
  //onInput = e => this.setState({ [e.target.id]: e.target.value });
  // onInput = (e) => {setSearch( {e.target.value })};
  // Select the wrapper and toggle class 'focus'
  // onFocus = e => e.target.parentNode.parentNode.classList.add('focus');
  // onBlur = e => e.target.parentNode.parentNode.classList.remove('focus');
  // Select item
  // onClickItem = item => this.setState({
   
  //   search: "",
  //   color: item
  // });

  const onClickItem = (item) => {
    router.push(`/${item._id}`);
    setSearch("");
    // setColor(item);
  } 
  // this.setState({
  //    search: "",
  //   color: item
  // });


   
    if (!data) {
      return <p className="text-white">Loading</p>
    }
    //console.log("lll",data);
    let filtered = data.filter(item => item.coinname.toLowerCase().includes(search.toLowerCase()));
    return (
      <div>
        <div className={classes.wrapper}>
          <div className={classes.search}>
          <div className="p-2">
         
          <svg fill="#9bbcd1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">   
           <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"/></svg>
             
           </div>
          
          {/* <i class="fas fa-search"></i> */}
            <input className="border-none"
              id="search"
              type="search"
              value={search}
              placeholder=" Search Token"
              onChange={(e)=>{setSearch(e.target.value)}}
              onFocus={(e)=> e.target.parentNode.parentNode.classList.add('focus')}
             // onBlur= {(e)=> e.target.parentNode.parentNode.classList.remove('focus')}
              //onChange={e.target.value}
              //onClick={onClickItem}
              // onFocus={onFocus}
              // onBlur={onBlur}
              
            />
           
          </div>
          {search.length > 1 && filtered.length > 0 && (
            <ul className={classes.list}>
              {filtered.map(item => (
                <li key={item._id} onClick={() => onClickItem(item)}>{item.coinname}</li>
              ))}
            </ul>
          )} 
        </div>
        </div>
    )
 
};

export default Search;