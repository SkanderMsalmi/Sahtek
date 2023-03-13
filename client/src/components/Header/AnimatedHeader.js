import { useEffect, useState } from 'react';
import styles from  "./Header.module.scss";
import anime from 'animejs/lib/anime.es.js';

function AnimatedHeader() {
    const size = document.body.clientWidth > 800 ? 100 : 50;
    const [columns,setColumns]=useState(Math.floor(document.body.clientWidth /  size));
    const [rows,setRows]=useState(Math.floor(document.body.clientHeight /  size));
    const [toggled,setToggled]=useState(true);
    let x=0;
    const createGrid = () => {
        
        setColumns(Math.floor(document.body.clientWidth / size));
        setRows(Math.floor(document.body.clientHeight / size));
    }
useEffect(() => {

  
   
    
 
    
 
    
    createGrid();
    // setTimeout(() => {
    //     anime({
    //         targets: ".tiley",
    //         opacity: toggled ? 0 : 1,
    //         delay: anime.stagger(50, {
    //           grid: [columns, rows],
    //           from: {col: 5, row: 5}
    //         })
    //       });
    // }, 200);
    
}, [])
window.onresize = () => createGrid();

// useEffect(() => {
//     const wrapper = document.getElementById("tiles");
//     wrapper.style.setProperty("--columns", columns);
//     wrapper.style.setProperty("--rows", rows);
// }, [columns,rows])
const handleOnClick = index => {
    setToggled(!toggled);
    console.log(index)
    anime({
      targets: ".tiley",
      opacity: toggled ? 0 : 1,
      delay: anime.stagger(50, {
        grid: [columns, rows],
        from: index
      })
    });
  }

    
    return (
        <div className={toggled==true ? styles.animated: styles.toggled+' '+styles.animated}>
        <div id="tiles" className={styles.tiles} style={{"--columns":columns,"--rows":rows}}>{[...Array(rows*columns)].map((y,r) => {
           
                return <div className={`tiley ${styles.tile}`} style={{opacity: 1}} onClick={()=>handleOnClick(r) }></div>
        
            
        })}</div>

<h1 id="title" className={styles.centered+' '+styles.title}>
<span className={styles.fancy}>Help </span>
 is a click away.
</h1>

<i id="icon" className={`fa-solid fa-heart ${styles.centered} ${styles.icon}`}></i>


        </div>
    )}

    export default AnimatedHeader;