import React, { useState, useEffect } from 'react'
import styles from '../src/styles/todo.module.css'
import * as actions from '../src/actions/index'
import * as firebaseAuth from '../src/config/FirebaseAuth'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link';
import firebase from '../src/config/Firebase'
import Loader from '../src/Components/Loader'
import Router from 'next/router';
import moment, { duration } from 'moment'





const todo = () => {

    let todayDate = moment().format('DDMMYYYY');

    const [RestList, setRestList] = useState([])
    const [IsDisabled, setIsDisabled] = useState(true)
    const [TaskName, setTaskName] = useState("")
    const [TaskDuration, setTaskDuration] = useState("")
    const [TaskDeadline, setTaskDeadline] = useState("")
    const [PastList, setPastList] = useState([])
    const [TaskArray, setTaskArray] = useState([])
    const [TodayList, setTodayList] = useState([])
    const [Loading, setLoading] = useState(true)
    const [Overlay, setOverlay] = useState(false)
    const user = useSelector(state => state.loggedReducer)
    const dispatch = useDispatch()
    const db = firebase.firestore()

    useEffect(() => {

        // INITIAL LOAD OF USER

        const token = localStorage.getItem('authToken');
        const updation = async () => {
            const verificationResult = await firebaseAuth.verifySecuredToken(token);
            if (verificationResult !== null) {
                dispatch(actions.setUser({
                    name: verificationResult.name,
                    email: verificationResult.email,
                    uid: verificationResult.uid
                }))
            }
        }
        if (token) {
            updation();
        } else {
            Router.push('/')
        }

    }, [])

    // FETCHING Tasks

    useEffect(() => {

        if (user.uid) {
            let tasks
            db.collection('users').doc(user.uid).get()
                .then((data) => {

                    tasks = data.data().tasks
                    let TasksForToday = []
                    let TasksForLater = []
                    let TasksForPast = []
                    console.log(tasks)
                    tasks.map(item => {
                        if (parseInt(item.deadline) == todayDate) {
                            TasksForToday.push(item)
                        } else if (parseInt(item.deadline) > todayDate) {
                            TasksForPast.push(item)
                        } else if (todayDate > parseInt(item.deadline)) {
                            TasksForLater.push(item)
                        }
                        console.log(todayDate > parseInt(item.deadline))
                        console.log(todayDate, parseInt(item.deadline))
                        setTodayList(TasksForToday)
                        setPastList(TasksForPast)
                        setRestList(TasksForLater)

                    })


                }).then(() => {
                    setTaskArray(tasks)
                    setLoading(false)
                })
        }
    }, [user])

    // ADDING TASK

    const addTask = async () => {

        if (TaskName === "")
            setTaskName("Boop")
        if (TaskDuration === "")
            setTaskDuration("0")
        let array = TaskArray
        array.push({ task: TaskName, duration: TaskDuration, deadline: TaskDeadline, isCompleted: false })
        db.collection('users').doc(user.uid).set({
            tasks: array
        }, { merge: true });
        console.log(array, TaskArray)
        let tasks
        setTodayList([])
        setPastList([])
        setRestList([])
        db.collection('users').doc(user.uid).get()
            .then((data) => {

                tasks = data.data().tasks
                let TasksForToday = []
                let TasksForLater = []
                let TasksForPast = []
                console.log(tasks)
                tasks.map(item => {
                    if (parseInt(item.deadline) == todayDate) {
                        TasksForToday.push(item)
                    } else if (parseInt(item.deadline) > todayDate) {
                        TasksForPast.push(item)
                    } else if (todayDate > parseInt(item.deadline)) {
                        TasksForLater.push(item)
                    }

                    setTodayList(TasksForToday)
                    setPastList(TasksForPast)
                    setRestList(TasksForLater)

                })


            }).then(() => {
                setTaskDeadline("")
                setTaskDuration("")
                setTaskName("")
                setOverlay(false)
            })

    }

    // INPUT ALTERATION

    const updateDuration = (e) => {
        setTaskDuration(e.target.value)
    }

    const updateDeadline = (e) => {
        setTaskDeadline(e.target.value)
        if (moment(TaskDeadline, "DDMMYYYY").isValid() && (TaskDeadline.length === 7)) {
            setIsDisabled(false)
            return
        }
        setIsDisabled(true)

    }

    const updateName = (e) => {
        setTaskName(e.target.value)



    }




    const toggleComplete = (i, list) => {
        if (list === 1) {
            let tasks = TodayList.slice(0)
            tasks[i].isCompleted = !tasks[i].isCompleted
            setTodayList(tasks)
            db.collection('users').doc(user.uid).set({ tasks: TodayList }, { merge: true });
        } else if (list === 2) {
            let tasks = RestList.slice(0)
            tasks[i].isCompleted = !tasks[i].isCompleted
            setRestList(tasks)
            db.collection('users').doc(user.uid).set({ tasks: RestList }, { merge: true });
        } else {
            let tasks = PastList.slice(0)
            tasks[i].isCompleted = !tasks[i].isCompleted
            setPastList(tasks)
            db.collection('users').doc(user.uid).set({ tasks: RestList }, { merge: true });
        }
    }

    if (Loading) {
        return <Loader />
    } else

        return (
            <div className={styles.main}>
                {Overlay &&
                    <div onClick={() => { setOverlay(!Overlay) }} className={styles.overlay}></div>
                }
                <nav className={styles.nav}>
                    <h4>ToDo</h4>
                    <Link href='/'><p onClick={() => { firebaseAuth.logout() }}>Log Out</p></Link>
                </nav>
                <div className={styles.list}>
                    <div>
                        <h2>Today </h2>
                        {TodayList.length == 0 &&
                            <div><i>Don't be lazy, Add tasks!</i></div>
                        }
                        {TodayList.map((item, i) => {
                            return (
                                <div className={styles.item}>
                                    <div>
                                        <h5>{item.task}</h5>
                                        <p>{item.duration}min</p>
                                    </div>
                                    <div onClick={() => { toggleComplete(i, 1) }} className={styles.isCompleted}>{item.isCompleted ? <img src="/check.svg" /> : <img src='/uncheck.svg' />}</div>
                                </div>
                            )
                        })}
                    </div>
                    {RestList.length > 0 &&
                        <div>
                            <h2>Upcoming</h2>
                            {RestList.map((item, i) => {
                                return (
                                    <div className={styles.item}>
                                        <div>
                                            <h5>{item.task}</h5>
                                            <p>{item.duration}min</p>
                                        </div>
                                        <div onClick={() => { toggleComplete(i, 2) }} className={styles.isCompleted}>{item.isCompleted ? <img src="/check.svg" /> : <img src='/uncheck.svg' />}</div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    {PastList.length > 0 &&
                        <div>
                            <h2>Past</h2>
                            {PastList.map((item, i) => {
                                return (
                                    <div className={styles.item}>
                                        <div>
                                            <h5>{item.task}</h5>
                                            <p>{item.duration}min</p>
                                        </div>
                                        <div onClick={() => { toggleComplete(i, 3) }} className={styles.isCompleted}>{item.isCompleted ? <img src="/check.svg" /> : <img src='/uncheck.svg' />}</div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
                <div className={styles.add} onClick={() => { setOverlay(true) }}><img src="/add.svg" alt="" /></div>
                {Overlay &&
                    <div className={styles.addScreen}>
                        <input placeholder="Task Name" onChange={updateName} value={TaskName} />
                        <div><p>Duration(in minutes)</p><input onChange={updateDuration} placeholder="Duration" value={TaskDuration} /></div>
                        <div><p>Deadline(DDMMYYYY)</p><input placeholder="Deadline" value={TaskDeadline} onChange={updateDeadline} /></div>
                        <div><button onClick={addTask} disabled={IsDisabled ? true : false}>Add</button></div>
                    </div>
                }
            </div >
        )
}

export default todo
