var React = require('react');

function NewPoll (props) {
    return (
        <div>
            <form>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input 
                        onChange={props.onUpdate}
                        value={props.title}
                        className="mdl-textfield__input" 
                        type="text" 
                        id="fullUrl" />
                    <label className="mdl-textfield__label" htmlFor="fullUrl">Title</label>                    
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
            title: ''
        }
    },
    handleSubmit: function() {
        //console.log(this.state.city);
        //this.context.router.push('/forecast/' + this.state.city)       
    },
    handleUpdate: function(e){                
        this.setState({
            title: e.target.value
        });
    },        
    render: function () {
        return <NewPoll onUpdate={this.handleUpdate} title={this.state.title} />
    }
});

module.exports = NewPollContainer;