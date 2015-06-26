/**
 * Created by rdreimann on 25.06.15.
 */

var FolderButton = React.createClass({

    getInitialState: function () {
      return {
        folder: [],
        mailsOfFolder: [],
        newNameFolder : ''
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

  componentWillUpdate: function() {
      var self = this;
      getAllMails().then(function (resp) {
        console.log(resp.data);

        self.setState({
          folder: resp.data
        });
      });

    },

    removeFolder : function (folder,i) {
      console.log(folder);
      var self = this;
      deleteFolder(folder).
        then(function (resp) {
          self.setState({folder: resp.data});
        })
    },

    renameFolder : function (folder,i) {
      var self = this;
      console.log(folder + ", "+ this.state.newNameFolder)
      updateFolderName(folder, this.state.newNameFolder).
        then(function(resp) {
          self.setState({folder: resp.data});
        })
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
    update: function(e) {
      this.setState({newNameFolder: e.target.value});
      console.log(this.state.newNameFolder)
    },

    onFolderChange : function () {
        console.log(this.state.folder)
    },


    render: function () {
      var folderButtons = [];
      for (var i=0; i< this.state.folder.length; i++){
        var help = this.state.folder[i];
        folderButtons.push(
                  <div>
                    <button onClick={this.mailsByFolder.bind(this,help)}>{help}</button>
                    <button onClick={this.removeFolder.bind(this,help)}>del {help}</button>
                    <input onChange={this.update}/>
                    <button onClick={this.renameFolder.bind(this,help)}>rename folder {help}</button>
                  </div>
                );
      }

      return (
       <div> {folderButtons}</div>
);
}
})
;

var MailHeadDiv = React.createClass({
    getInitialState: function () {
      return {
        mailContent : ''
      }
    },

  update : function () {
    this.setState({mailContent : this.props.mail.text});
    console.log("blub"+this.state.mailContent);
  },
  render: function() {
    return (
      <div>
        <div>
          <label>{this.props.mail.sender}</label>
          <label>{this.props.mail.subject} </label>
          <label>{this.props.mail.date} </label>
        </div>
        <button onClick={this.update}>show</button>
        <input type="text" value="other Folder" />
        <button>move</button>
        <button>remove</button>

        <div> {this.state.mailContent} </div>
      </div>
    );
  }
});

var MailsFromFolderDiv = React.createClass({

    componentWillReceiveProps: function(nextProps) {
      this.replaceState({mailHeads :nextProps })
    },
    render : function() {
      var folderMails = [];
      for (var i=0; i< this.props.mailHead.length; i++) {
        var help = this.props.mailHead[i];
        folderMails.push(<MailHeadDiv mail={this.props.mailHead[i]}/>);
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
