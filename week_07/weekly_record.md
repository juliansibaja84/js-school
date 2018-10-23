# Week 7

This is a register (kind of a summary) of what I've learned during the week.
All the information here is for different sources.

## React (Medium level)

For this week I think all I need to know is well explained in the documentation,
however if something is not explicit in there I will put it here.

### Order of the lyfecycle methods

1. getDeaultProps (happens once)
2. getInitialState (happens once)
3. componentWillMount (happens once)
4. render (every time the component changes)
5. componentDidMount (happens once)
6. componentWillUnmount (happens once)


### When to use the lifecycle hooks

#### componentWillMount

**Most Common Use Case:** App configuration in your root component.

**Can call setState:** Don’t. Use default state instead.

#### componentDidMount

**Most Common Use Case:** Starting AJAX calls to load in data for your component.

**Can call setState:** Yes.

#### componentWillReceiveProps(nextProps)

**Most Common Use Case:** Acting on particular prop changes to trigger state transitions.

**Can call setState:** Yes.

#### shouldComponentUpdate(NextProps, NextState)

**Most Common Use Case:** Controlling exactly when your component will re-render.

**Can call setState:** No.

#### componentWillUpdate

**Most Common Use Case:** Used instead of componentWillReceiveProps on a component that also has shouldComponentUpdate (but no access to previous props).

**Can call setState:** No.

#### componentDidUpdate

**Most Common Use Case:** Updating the DOM in response to prop or state changes.

**Can call setState:** Yes.

#### componentWillUnmount

**Most Common Use Case:** Cleaning up any leftover debris from your component.

**Can call setState:** No.

### Redux Forms
