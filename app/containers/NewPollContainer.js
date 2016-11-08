var React = require('react');

function NewPoll (props) {
    return (
        <div>
            <form>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input 
                        onChange={props.onUpdate.bind(null, 'test')}
                        value={props.title}
                        className="mdl-textfield__input" 
                        type="text" 
                        id="title" />
                    <label className="mdl-textfield__label" htmlFor="title">Title</label>                    
                </div>
                <br />
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" id="option1"/>
                    <label className="mdl-textfield__label" htmlFor="option1">Option1</label>                    
                </div>
                <br />
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" id="option2"/>
                    <label className="mdl-textfield__label" htmlFor="option2">Option2</label>                    
                </div>                     
            </form>            
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
                option1: '',
                option2: ''
            }
        }
    },
    handleSubmit: function() {
        //console.log(this.state.city);
        //this.context.router.push('/forecast/' + this.state.city)       
    },
    handleUpdate: function(name, e){      
        console.log(name);          
        this.setState({
            title: e.target.value
        });
    },        
    render: function () {
        return <NewPoll onUpdate={this.handleUpdate} title={this.state.title} options={this.state.options} />
    }
});

module.exports = NewPollContainer;