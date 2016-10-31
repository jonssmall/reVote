var React = require('react');

var Main = React.createClass({
  render: function () {
    return (
        <div>                  
            <main>
                <div>                    
                    {this.props.children}                    
                </div>
            </main>
        </div>
    )
  }
})

module.exports = Main;

