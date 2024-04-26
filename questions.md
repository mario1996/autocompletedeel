1. What is the difference between Component and PureComponent? Give an example where it might break my app.

A Component re-renders whenever the parent component re-renders or when it's state or props change whereas a Pure Component compares the previous version with the most recent version to check if anything changes by doing a shallow comparison in shouldComponentUpdate.

**Component** (difference is in the extends, the component extends "Component")

```
import React, { Component } from 'react';
class ComponentExample extends Component {
  render() {
    return <div>This is a component</div>;
  }
}
```

**Pure Component** (difference is in the extends, the pure component extends "PureComponent")

```
import React, { PureComponent } from 'react';
class PureComponentExample extends PureComponent {
  render() {
    return <div>This is a pure component</div>;
  }
}
```

A Pure Component might break the app if it's child components also got children, because a pure component only does a shallow comparison, meaning that it only compares the top level properties.

```
class PureComponentExample extends React.PureComponent {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

class ComponentExample extends React.Component {
  render() {
    return (<>
     <PureComponentExample>
        This is simple text
     </PureComponentExample>
     <PureComponentExample>
       <ChildComponent>This is a child component and it will always re-render because it will fail the shallow comparison</ChildComponent>
     </PureComponentExample>
    </>);
  }
}
```

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

Context is a way of avoiding prop drilling, meaning that you can avoid passing a prop through every component until it reaches the destination of the component that it's supposed to use that prop. Just have to define a Context with the prop that you want to pass and then just call it on the component or components that are going to use it.
ShouldComponentUpdate it's used to help to decide if a component needs to be re-rendered or not by checking if the props or states changed with a shallow comparison.
Using Context + ShouldComponentUpdate might be dangerous because since Context changes do not appear as new props or state changes to the component, the typical comparisons in shouldComponentUpdate won't detect changes in context. Functional components might be a better solution to avoid this by handling dependencies and updates more cleanly. If there's really a need to use shouldComponentUpdate + context, we need to ensure that changes in context values are explicitly checked within shouldComponentUpdate by passing context as a prop or using another method to ensure the component is aware of context changes.

3. Describe 3 ways to pass information from a component to its PARENT.

- Callback Functions: A callback is a function passed as an argument to another function.
- Context: When a child component needs to communicate with a parent component, can consume the Context and use a callback function to send data back to the parent.
- State Lifting: By passing the state of the childs components to the parent we can then pass callback functions as props to the child components that will call the callback functions to update the parents state.

4. Give 2 ways to prevent components from re-rendering.

- React.memo: React.memo is a HOC (higher order component) that memoizes a functional component. It is useful in highly dynamic applications where props frequently change but not all changes require a re-render.
- shouldComponentUpdate: As mentioned previously it allows for complex comparisons between current and future props and state. It's more suitable for Class components.

5. What is a fragment and why do we need it? Give an example where it might break my app.

It is when we need to wrap elements in a single element by using one of this tags `<React.Fragment> </React.Fragment>` or simply the shorthand `<></>`.
One of the scenarios where it might break it when we're dealing with dynamic lists and we need to pass a key to the fragment, it will only work if we pass it by using the long syntax `<React.Fragment>` like the example below:

```
<React.Fragment key={item.id}><p>Some content</p><p>Some content</p></React.Fragment>
```

6. Give 3 examples of the HOC pattern.

An HOC is a function that takes a component and returns a new component, thereby enhancing the original component with additional functionalities or data.
3 examples of the HOC pattern are:

- Authentication: An HOC can be used to handle authentication logic, wrapping components that should only be accessible by authenticated users. The HOC can check authentication status and redirect the user or render the appropriate content.
- Data fetching: An HOC can abstract away the data-fetching logic, making it reusable for any component that needs to fetch data. This HOC could pass fetched data as props to the wrapped component.
- Logging: An HOC can be used to add logging functionality, which can be useful for debugging, measuring performance, or tracking user interaction.

7. What's the difference in handling exceptions in promises, callbacks and async...await?

- Callbacks: Manual error checking and handling within each callback.

```
function callbackExample() {
    const x = 1;
    if(x + 1 === 3) {
        console.error('Error');
    } else {
       console.log("is equal to 3");
    }
}

isEqualTo3(callbackExample(1));
isEqualTo3(callbackExample(2));
```

- Promises: In promises we can use the .catch() method, allowing cleaner management of error handling across multiple asynchronous operations.

```
fetch('https://someurl.com')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error', error));
```

- Async/Await: Uses traditional try/catch logic, making the code look synchronous and straightforward, while errors are automatically caught from rejected promises.

```
async function fetchData() {
    try {
        const response = await fetch('https://someurl.com');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
```

8. How many arguments does setState take and why is it async.

setState can take up to two arguments:

- The first argument can either be an object representing the new state or a function.
- The second argument is an optional callback function that will be executed once setState is completed and the component has been re-rendered. This is useful for when you need to execute something right after the state update and re-render occur.

Its asynchronous to improve perfomance when for example there's multiple setStates to be done, it will gather all in one and then do it to improve performance. Another reason is that by handling setState asynchronously, React ensures that it has the complete picture of state changes across the entire component tree, optimizing the reconciliation process to perform only necessary DOM updates.

9. List the steps needed to migrate a Class to Function Component.

   - Replace `this.state` with use the `useState`.
   - Replace lifecycle methods with use the useEffect. Lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` can be replicated using the `useEffect` hook.
   - Replace all the `this.props` with `props` in the functions parameters.
   - Replace the class definition with a function declaration and the replace the return of the class that is done with the `render` with the return of the function that is done with the `return` keyword.
   - Test that everything works as before.

10. List a few ways styles can be used with components.

- By creating a css file that is then imported in the component.

```
// someComponent.css

.someComponent {
    background-color: green;
}

// someComponent.jsx
import './someComponent.css';

function SomeComponent() {
    return <div className="someComponent">Hello</div>;
}
```

- Styled components

```
import styled from 'styled-components';

const StyledDiv = styled.div`
    background-color: green;
`;

function SomeComponent() {
    return <StyledDiv>Hello</StyledDiv>;
}
```

- Inline styling

```
function SomeComponent() {
    return <div style={{ backgroundColor: green }}>Hello</div>;
}
```

- Tailwind CSS

```
function SomeComponent() {
    return <div className="bg-green">Hello</div>;
}
```

11. How to render an HTML string coming from the server.
    It can be done by using dangerouslySetInnerHTML, but if possible it should be avoided because it is vulnerable to cross-site scripting (XSS) attacks.

```
function SomeComponent() {
    const innerHTML = '<b>be careful using this!!!</b>';
    return <div dangerouslySetInnerHTML={{__html: innerHTML}} />;
}
```
