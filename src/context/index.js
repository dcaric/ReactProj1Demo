import React,{ Component } from 'react';
import { ToastContainer, toast } from 'react-toastify'

const MyContext = React.createContext();


class MyProvider extends Component {

    state = {
        stage:1,
        players:[],
        result:''
    }

    addPlayerHandler = (name) =>{
        this.setState((prevState)=>({
            players:[
                ...prevState.players,
                name
            ]
        }))
    }

    removePlayerHandler = (idx) => {
        let newArray =  [...this.state.players]; // it's better to use a new array instead of mutating exising one
        newArray.splice(idx,1);
        this.setState({players:newArray});
    }

    nextHandler = () =>{
        const { players } = this.state; // hack just to avoind this.state.players - just players

        if(players.length < 2){
            
            toast.error('You need more than one player',{
                position: toast.POSITION.TOP_LEFT,
                autoClose:2000
            });
        } else {
            this.setState({
                stage:2
            },()=>{
                // this is CALLBACK after setState is run, so it is called after setState
                setTimeout(()=>{
                    this.generateLooser()
                },2000)
            })
        }
    }

    generateLooser = () => {
        const { players } = this.state;
        this.setState({
            result: players[Math.floor(Math.random()*players.length)]
        })
    }
    
    resetGame = () => {
        this.setState({
            stage:1,
            players:[],
            result:''
        })
    }


    render(){
        return(
            <>
                <MyContext.Provider value={{
                    state: this.state,
                    // these are links to the real functions LEFT side and RIGHT side contains
                    // names which are used in other components
                    addPlayer: this.addPlayerHandler,
                    removePlayer: this.removePlayerHandler,
                    next: this.nextHandler,
                    getNewLooser: this.generateLooser,
                    resetGame: this.resetGame
                }}>
                    {this.props.children}
                </MyContext.Provider>
                <ToastContainer/>
            </>
        )
    }

}


export {
    MyContext,
    MyProvider
}