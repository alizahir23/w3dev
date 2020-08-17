import React, { useState } from 'react'
import styles from '../src/styles/todo.module.css'

const todo = () => {

    const [RestList, setRestList] = useState([{ task: "get food", duration: 30, isCompleted: false }, { task: "get food", duration: 30, isCompleted: false }])
    const [TodayList, setTodayList] = useState([{ task: "get food", duration: 30, isCompleted: false }, { task: "get food", duration: 30, isCompleted: false }])


    const toggleComplete = (i, list) => {
        if (list === 1) {
            let List = TodayList.slice(0)
            List[i].isCompleted = !List[i].isCompleted
            setTodayList(List)
        } else {
            let List = RestList.slice(0)
            List[i].isCompleted = !List[i].isCompleted
            setRestList(List)


        }
    }

    return (
        <div className={styles.main}>
            <nav className={styles.nav}>
                <h4>ToDo</h4>
            </nav>
            <div className={styles.list}>
                <div>
                    <h2>Today</h2>
                    {TodayList.map((item, i) => {
                        return (
                            <div key={item.task} className={styles.item}>
                                <div>
                                    <h5>{item.task}</h5>
                                    <p>{item.duration}min</p>
                                </div>
                                <div onClick={() => { toggleComplete(i, 1) }} className={styles.isCompleted}>{item.isCompleted ? <img src="/check.svg" /> : <img src='/uncheck.svg' />}</div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h2>Rest List</h2>
                    {RestList.map((item, i) => {
                        return (
                            <div key={item.task} className={styles.item}>
                                <div>
                                    <h5>{item.task}</h5>
                                    <p>{item.duration}min</p>
                                </div>
                                <div onClick={() => { toggleComplete(i, 2) }} className={styles.isCompleted}>{item.isCompleted ? <img src="/check.svg" /> : <img src='/uncheck.svg' />}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default todo
