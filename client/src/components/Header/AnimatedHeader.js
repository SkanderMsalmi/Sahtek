import { useEffect, useState } from 'react';
import styles from "./Header.module.scss";
import anime from 'animejs/lib/anime.es.js';

function AnimatedHeader() {
  const [size, setSize] = useState(document.body.clientWidth > 800 ? 100 : 50);
  const [columns, setColumns] = useState(Math.floor(document.body.clientWidth / size));
  const [rows, setRows] = useState(Math.floor(document.body.clientWidth / size));
  const [toggled, setToggled] = useState(true);
  const createGrid = () => {
    setSize(800);
    setColumns(Math.floor(document.body.clientWidth / size));
    setRows(Math.floor(document.getElementById('heads').clientHeight / size));
  }

  useEffect(() => {
    createGrid();
    window.addEventListener("resize", createGrid);
    return () => window.removeEventListener("resize", createGrid);
  }, [])
  // useEffect(() => {
  //     const wrapper = document.getElementById("tiles");
  //     wrapper.style.setProperty("--columns", columns);
  //     wrapper.style.setProperty("--rows", rows);
  // }, [columns,rows])
  const handleOnClick = index => {
    setToggled(!toggled);
    anime.timeline({
      targets: ".tiley",
      opacity: toggled ? 0 : 1,
      duration: 1000,
      delay: anime.stagger(50, {
        grid: [columns, rows],
        from: index
      })
    }).add({
      width: toggled ? '0' : '0',
      height: toggled ? '0' : '0',
      duration: 10000,
    })
  }


  return (
    <div className={styles.h}>
      <div id="heads" className={toggled === true ? styles.animated : styles.toggled + ' ' + styles.animated}>
        <div id="tiles" className={styles.tiles} style={{ "--columns": columns, "--rows": rows }}>{[...Array(rows * columns)].map((y, r) => {

          return <div className={`tiley ${styles.tile}`} style={{ opacity: 1 }} onClick={() => handleOnClick(r)}></div>


        })}</div>

        <h1 id="title" className={styles.centered + ' ' + styles.title}>
          <span className={styles.fancy}>Help</span>is one click away.
        </h1>
        {/* <h2 className={styles.centered + ' ' + styles.title2}>
          Get expert help from the comfort of your own home.
        </h2> */}
        <div id="icon" className={` ${styles.centered} ${styles.icon}`}></div>


      </div>
    </div>
  )
}

export default AnimatedHeader;