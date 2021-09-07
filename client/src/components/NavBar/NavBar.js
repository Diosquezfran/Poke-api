import React from 'react';
import styles from './NavBar.module.css';
import img from '../../assets/pngwing.com2.png';
function NavBar() {
    return (
        <div className={styles.NavBar}>
            <div className={styles.navContainer}>
                {/* <div className={styles.navText}>
                    mensaje
                </div> */}
                <img src={img} alt="pic" className={styles.navImage}/>
            </div>
        </div>
    )
}

export default NavBar