/**
 * Created by rdreimann on 25.06.15.
 */

var FolderButton = React.createClass({

    getInitialState: function () {
      return {
        folder: [],
        mailsOfFolder: []
      }
    },

    componentDidMount: function () {
      var self = this;
      getAllMails().then(function (resp) {
        console.log(resp.data);

        self.setState({
          folder: resp.data
        });
      });
    },
    mailsByFolder : function(folder,i) {
      console.log(i);
      console.log(folder);
      var self = this;
      getMailsByFolder(folder).
        then(function (resp) {
          self.setState({mailsOfFolder : resp.data});
          self.props.callbackParent(self.state.mailsOfFolder); // hey parent, I've changed!
      }).
        catch(function (response) {
          console.log(response);
        });
    },

    onFolderChange : function () {
        console.log(this.state.folder)
    },


    render: function () {
      var folderButtons = [];
      for (var i=0; i< this.state.folder.length; i++){
        var help = this.state.folder[i];
        folderButtons.push(<button onClick={this.mailsByFolder.bind(this,help)}>{help}</button>);
      }

      return (
       <div> {folderButtons}</div>
);
}
})
;

var MailsFromFolderDiv = React.createClass({

    componentWillReceiveProps: function(nextProps) {
      this.replaceState({mailHeads :nextProps })
    },
    render : function() {
      var folderMails = [];
      for (var i=0; i< this.props.mailHead.length; i++) {
        var help = this.props.mailHead[i];
        folderMails.push(<div> <label> {help.sender}</label> <label> {help.subject}</label> <label>{help.date}</label></div>);
      }
    return (
      <div>
        <label>{folderMails}</label>
      </div>
    );
  }
})


var Mail = React.createClass({
  getInitialState: function () {
    return {mailList: [{ sender: "blub"},{bla: "4242"}] };
  },
  onFolderButtonChange: function(newFolderMails) {
    this.replaceState({mailList:newFolderMails});
    console.log("REACTMail::Folder::Mails ");
    console.log(this.state.mailList);
  },
  render: function () {  //child callbacks übergeben
    return (
        <div>
          <FolderButton callbackParent={this.onFolderButtonChange}/>
          <MailsFromFolderDiv mailHead={this.state.mailList} />
        </div>
    )
  }
});

React.render(
<Mail />,
  document.getElementById('content')
)
;
