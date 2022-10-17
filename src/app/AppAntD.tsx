import React, {useCallback, useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC} from './app-reducer'
import {BrowserRouter, Redirect, Route, useHistory} from 'react-router-dom'
import {Login} from '../features/Login/Login'
import {logoutTC} from '../features/Login/auth-reducer'
import TodolistItem from "../features/TodolistsList/TodolistItem";
import TaskItem from "../features/TodolistsList/Todolist/Task/TaskItem";
import {observer} from "mobx-react";
import { Link } from 'react-router-dom'
import { Button, Layout} from 'antd';
import {Footer} from 'antd/lib/layout/layout'
import 'antd/dist/antd.css';

const {Header, Content} = Layout;



const AppAntD = observer(() => {
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    let history = useHistory();

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])


    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])


    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            {/*<CircularProgress/>*/}
        </div>
    }

    return (<div  style={{maxHeight:'100vh',display:'flex', justifyContent:"center",alignItems:'center'}}>
            <Layout className="layout">
                <Header style={{display:'inline-flex',alignItems:'center'}} >
                    <div className="logo"/>
                    {/*<div style={{color:'white', margin:'0 20px'}}>Home</div>*/}

                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}


                </Header>
                <Content style={{padding: '0 50px',minHeight:'80vh'}}>
                    <div className="site-layout-content">
                        <BrowserRouter>
                            <div className="App">
                                <ErrorSnackbar/>
                                <Route exact path={'/'} render={() => <TodolistsList/>}/>
                                <Route path={'/login'} render={() => <Login/>}/>
                                <Route exact path={'/todolistItem/:todoId'} render={() => <TodolistItem/>}/>
                                <Route exact path={'/todolistItem/:todoId/taskItem/:taskId'}
                                       render={() => <TaskItem/>}/>
                            </div>
                        </BrowserRouter>

                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </div>
    )
});

export default AppAntD
