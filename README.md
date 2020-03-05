# RAILS AND REACT
https://medium.com/swlh/getting-started-with-rails-6-and-react-afac8255aecd

### create new rails app

`rails new PROJECT_NAME -d postgresql --webpack=react`

`gem 'faker', :git => 'https://github.com/faker-ruby/faker.git', :branch => 'master'` in dev section
`bundle add react-rails`

`git add .` 

`git commit -m "initial commit"`


Let’s generate resources for a User this is like model but gives us a controller and routes as 
well as a model and migration files
`rails g resource User f_name:string l_name:string`


Let’s run the install command now, which will add some additional files to our Rails project:

`rails g react:install`
> adds packages to package.json and requires in app/javascript/packs/application.js.

`rails g react:component Users users:array`
>By specifying users:array we are stating that the component should expect a prop called users which is an array

this is what is generated, let's remove PropType stuff for now

```javascript
import React from "react"
import PropTypes from "prop-types"
class Test extends React.Component {
  render () {
    return (
      <React.Fragment>
        Tests: {this.props.tests}
      </React.Fragment>
    );
  }
}

Test.propTypes = {
  tests: PropTypes.array
};
export default Test
```

```javascript
import React from "react"
class Test extends React.Component {
  render () {
    return (
      <React.Fragment>
        Tests: {this.props.tests}
      </React.Fragment>
    );
  }
}
export default Test
```
