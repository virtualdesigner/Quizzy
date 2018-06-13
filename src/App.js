import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

import {
  ADD_ORIGINAL_QA,
  ADD_USER_A,
  TOGGLE_ACTIVE,
  TOGGLE_COMPLETED,
  ADD_LEVEL_POINT,
  ADD_SCORE_POINT
} from "./actionCreators/caseConstants";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      QA: {
        ans: "",
        ques: ""
      },
      A: {
        ans: ""
      }
    };

    this.onQAChange = this.onQAChange.bind(this);
    this.onQASubmit = this.onQASubmit.bind(this);
    this.onAChange = this.onAChange.bind(this);
    this.onASubmit = this.onASubmit.bind(this);
  }

  // On Question Answer Input Change
  onQAChange(e) {
    /* Taking the copy of the React state of QA inorder to get rid of mutating the state, remember 
    (
    eg:
    const example = {
      id: 0
      name: something
    };
    const exampleCopy = example;
    exampleCopy.id = 1;
    // This will change the                           value in both exampleCopy                         and example too. This is called as mutating.
    )
    */
    let QACopy = JSON.parse(JSON.stringify(this.state.QA));

    // Setting the value of question/ans corresponding to the input id.
    QACopy[e.target.id] = e.target.value;
    this.setState({
      QA: QACopy
    });
  }

  // On Question Answer Input Submit
  onQASubmit(e) {
    // Preventing default form submit.
    e.preventDefault();

    // Checks if the user had entered both the question and answer
    if (!this.state.QA.ques || !this.state.QA.ans) {
      return;
    }

    // Dispatches the Original QA to the Redux store
    this.props.dispatch({
      type: ADD_ORIGINAL_QA,
      payload: { ques: this.state.QA.ques, ans: this.state.QA.ans }
    });

    // Toggling Active to True
    this.props.dispatch({
      type: TOGGLE_ACTIVE,
      payload: true
    });

    // Toggling Completed to False
    this.props.dispatch({
      type: TOGGLE_COMPLETED,
      payload: false
    });

    // Taking the copy of QA and setting the values of QA to empty string
    const QACopy = JSON.parse(JSON.stringify(this.state.QA));
    QACopy.ques = "";
    QACopy.ans = "";

    // Now, setting the empty stringed QA values to the QA inorder to empty the input boxes after the user had submitted the QA.
    this.setState({
      QA: QACopy
    });
  }

  // On Answer Change
  onAChange(e) {
    //Taking the copy of the React state of A inorder to get rid of mutating the state.
    let ACopy = JSON.parse(JSON.stringify(this.state.A));

    // Setting the value of question/ans corresponding to the input id [the input id will be 'ans' because there is only one input of A (Answer)].
    ACopy[e.target.id] = e.target.value;
    this.setState({
      A: ACopy
    });
  }

  // On Question Answer Input Submit
  onASubmit(e) {
    // Preventing default form submit
    e.preventDefault();

    // Checking if the user had entered the answer
    if (!this.state.A.ans) {
      return;
    }

    // Dispatching the user input to the Redux store
    this.props.dispatch({
      type: ADD_USER_A,
      payload: { ans: this.state.A.ans }
    });

    // In here, we are checking whether the user input (answer) matches the correct answer (original) and dispatching to add the score point if both matches.

    /*TIPS: In here i have learnt that, we can't use the result of actions that were dispatched together with the dispatch that we were using to use the result of actions of that dispatch
    For example:
      dispatch({
        type: "ADD_USER",
        payload: "S.M.DEEPAK"
      })
    // The above dispatch will make changes to the store only after every dispatches in the file is done. And the result of the dispatch will be avaliable only after re-render.
    */
    if (
      this.state.A.ans ===
      this.props.store.OriginalQA[this.props.store.UserPoints.levelPoint].ans
    ) {
      this.props.dispatch({
        type: ADD_SCORE_POINT
      });
    }

    // Dispatching to add the level point to go to the next question
    this.props.dispatch({
      type: ADD_LEVEL_POINT
    });

    // Checking if the next question exits or not and if not, it dispatches 'TOGGLE_ACTIVE' to false and 'TOGGLE_COMPLETED' to true, (Which results in finishing the quiz by showing the user score)
    if (
      !this.props.store.OriginalQA[this.props.store.UserPoints.levelPoint + 1]
    ) {
      // TOGGLING ACTIVE TO FALSE
      this.props.dispatch({
        type: TOGGLE_ACTIVE,
        payload: false
      });

      // TOGGLING COMPLETED TO TRUE
      this.props.dispatch({
        type: TOGGLE_COMPLETED,
        payload: true
      });
    }

    // Now, taking the Copy of A from React store and setting it's values to empty string and finally setting the original state of A using the copy of A.
    const ACopy = JSON.parse(JSON.stringify(this.state.A));
    ACopy.ans = "";

    this.setState({
      A: ACopy
    });
  }

  // Rendering starts
  render() {
    return (
      <div id="fullSite">
        <div className="mainPage">
          <h1 id="heading">Quizzy</h1>
          <form onSubmit={this.onQASubmit} id="firstForm">
            <input
              type="text"
              id="ques"
              onChange={this.onQAChange}
              value={this.state.QA.ques}
              placeholder="Write question here..."
              spellCheck="false"
              autoComplete="off"
            />
            <input
              type="text"
              id="ans"
              onChange={this.onQAChange}
              value={this.state.QA.ans}
              placeholder="Write answer here..."
              spellCheck="false"
              autoComplete="off"
            />
            <button type="submit">ADD</button>
          </form>
        </div>

        {this.props.store.Toggle.active &&
        !this.props.store.Toggle.completed ? (
          <div id="QAPage">
            <form onSubmit={this.onASubmit}>
              <div id="question">
                {
                  this.props.store.OriginalQA[
                    this.props.store.UserPoints.levelPoint
                  ].ques
                }
              </div>
              <input
                type="text"
                id="ans"
                onChange={this.onAChange}
                value={this.state.A.ans}
                placeholder="Write answer here..."
                spellCheck="false"
                autoComplete="off"
              />
              <button type="submit">NEXT</button>
            </form>
          </div>
        ) : !this.props.store.Toggle.active &&
        this.props.store.Toggle.completed ? (
          <div id="QAPage">
            <div id="results">
              <div>
                Your Score is {this.props.store.UserPoints.scorePoint} out of{" "}
                {this.props.store.UserPoints.levelPoint}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

// Function to Map the state from the Redux store to the React as Props
const mapStateToProps = store => ({
  store
});

// Function to get the Dispatch action from Redux and passing it to the React as Props (Using this we can dispatch functions inside React)
const mapDispatchToProps = dispatch => ({
  dispatch: (type, payload) => dispatch(type, payload)
});

// Connecting the functions mapStateToProps & mapDispatchToProps function to React (App.js).
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
