var React = require('react');
var api = require('../helpers/pollHelpers');

function NewPoll (props) {
    var options = [];
    for (var option in props.options) { //is there a way not to ferry it like this
        options.push(
            <Option 
                key={option} 
                value={props.options[option]} 
                onUpdate={props.onUpdate} 
                name={option} 
            />
        );
    }
    return (
        <div>
            <form>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input 
                        onChange={props.onUpdate.bind(null, 'title')}
                        value={props.title}
                        className="mdl-textfield__input" 
                        type="text" 
                        id="title" />
                    <label className="mdl-textfield__label" htmlFor="title">Title</label>                    
                </div>         
                {options}
                <button onClick={props.newOption} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                    New Option
                </button>
                <button onClick={props.onSubmit} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                    Create Poll
                </button>                                       
            </form>             
        </div>
    )
}

function Option(props) {
    return (
        <div>            
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input 
                    onChange={props.onUpdate.bind(null, props.name)}
                    value={props.value}
                    className="mdl-textfield__input" 
                    type="text" 
                    id={props.name} />
                <label className="mdl-textfield__label" htmlFor={props.name}>{props.name}</label>                    
            </div>
        </div>
    )    
}

var NewPollContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            title: '',
            options: {
                Option1: '',
                Option2: ''
            }
        }
    },
    //todo: validate against empty options, allow user to delete >2 options
    handleSubmit: function(e) {
        e.preventDefault();
        api.createPoll(this.state)
            .then(result => {
                console.log(result);
                this.context.router.push(`/polls/${result.data._id}`)
            });
    },
    handleUpdate: function(name, e){      
        if(name == "title") {
            this.setState({
                title: e.target.value
            });
        } else {
            let newOptions = this.state.options;
            newOptions[name] = e.target.value;
            this.setState({
                options: newOptions
            });
        }              
    },
    handleNewOption: function() {
        let newOptions = this.state.options;
        let counter = Object.keys(newOptions).length;
        counter++;        
        newOptions[`Option${counter}`] = '';
        console.log(newOptions);
        this.setState({
            options: newOptions
        });
    }, 
    render: function () {
        return <NewPoll 
                onUpdate={this.handleUpdate}
                onSubmit={this.handleSubmit} 
                title={this.state.title} 
                options={this.state.options}
                newOption={this.handleNewOption} />
    }
});

module.exports = NewPollContainer;