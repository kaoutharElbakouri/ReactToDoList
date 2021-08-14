  class Todo extends React.Component {
 constructor(props){
   super(props);
   this.state={
     item:
     [
       //la vue actuelle de notre app
       // {id: 1, do: 'Food shopping', done: false},
       // {id: 2, do: 'Prepare dinner', done: false},
       // {id: 3, do: 'Yoga class', done: true}
     ]
   }
 }

 addItem(){
   let l = this.state.item.length;
  //on fait l'index 0 pour selectionner le premier input
   let inputDo = document.getElementsByTagName('input')[0];
   let newId = 0;
   if(l===0){
  newId=0;
   }else{
  newId = (this.state.item[l-1].id)+1;
   }
   let newItem = [{id: newId, do:inputDo.value, done:false}];
   let itemCopy = this.state.item.slice();
   //add item to the end of the list
    itemCopy = itemCopy.concat(newItem);
    //change the value of state object
    this.setState({item: itemCopy});
 }

 // deleteItem(key){
 //   const index = this.state.item.findIndex(i => i.id===key);
 //   let newT=this.state.item.slice();
 //   let newTab = newT.splice(index,1);
 //   this.setState({item:newT});
 // }
 // //method 1 to delete :
 // deleteItem(key){
 //   const index = this.state.item.findIndex(i => i.id===key);
 //   let newT=this.state.item.slice();
 //   newT.splice(index,1);
 //   this.setState({item:newT});
 // }
 //method 2 to delete
 deleteItem(key){
   const index = this.state.item.findIndex(i => i.id===key);
   let newT=this.state.item.slice();

   let newTab1 = newT.splice(1,index);
   let newTab2 = newT.splice(index+1, this.state.item.length);
   newTab1= newTab1.concat(newTab2);
   this.setState({item:newTab1});
 }

   deleteAll(){
     let tabToDel=this.state.item.slice();
     tabToDel=[];
     this.setState({item:tabToDel});
   }

 done(key){
   const index = this.state.item.findIndex(i=> i.id===key);
   let itemCopy = this.state.item.slice();
   if(this.state.item[index].done===false){
     itemCopy[index].done = true;
   }else{
     itemCopy[index].done = false;
   }
    this.setState({item:itemCopy});
 }


 render(){
   return(
   <div>
     <h1>To-do List</h1>
     <div>
     <p id="task">there are {this.state.item.length} Tasks to do</p>

     <input id="newTodo" type='text' placeholder='Enter new todo'/>
     <button onClick={()=>this.addItem() }>AddToList</button>
     <button onClick={()=>this.deleteAll() }>deleteAll</button>
     </div>

     <List item={this.state.item} onDelete={(key)=>this.deleteItem(key)} onDone={(key)=>this.done(key)}/>
   </div>



  );
 }
}


var List = React.createClass({
 render(){
   let itemsToDisplay = this.props.item.map(i=>{
     return (<ListItem key={i.id} do={i.do} done={i.done} onDelete={()=>this.props.onDelete(i.id)} onDone={()=>this.props.onDone(i.id)}/>);
   });
   return(
   <ul>

     {itemsToDisplay}

   </ul>
   );
 }

});

var ListItem = React.createClass({
 render(){
   return(
     <li key={this.props.key} className={this.props.done===true? 'done':null}>
       <p>{this.props.do}</p>
       <div>
         <button className='btn'onClick={()=>this.props.onDone()}>{this.props.done===true?'undone':'done'}</button>
         <button className='btn'onClick={()=>this.props.onDelete()}>delete</button>
       </div>
     </li>
   )
 }
});

ReactDOM.render(
 <Todo />,
 document.getElementById('toDoList')
);
