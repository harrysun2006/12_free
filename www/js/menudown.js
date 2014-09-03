   //Contents for menu 1
   var client_functions=new Array()
   client_functions[0]="<a href='addclient.php'>Add New Client</a>"
   client_functions[1]="<a href='manageclients.php'>Manage Clients</a>"
   client_functions[2]="<a href='mailer.php'>E-Mail Clients</a>"

   //Contents for menu 2, and so on
   var project_functions=new Array()
   project_functions[0]="<span class='navcat'><b>Projects</b></span>"
   project_functions[1]="<a href='addproject.php'>Add New Project</a>"
   project_functions[2]="<a href='manageprojects.php'>Manage Projects</a>"
   project_functions[3]="<a href='project_types.php'>Manage Project Types</a>"
   project_functions[4]="<a href='filemanager.php'>File Manager</a>"
   project_functions[5]="<span class='navcat'><b>Tasks</b></span>"
   project_functions[6]="<a href='addtask.php'>Add New Task</a>"
   project_functions[7]="<a href='managetasks.php'>Manage Tasks by Project</a>"

   var billing_tools=new Array()
   billing_tools[0]="<span class='navcat'><b>Time Billing</b></span>"
   billing_tools[1]="<a href='addbilltime.php'>Record Billed Time</a>"
   billing_tools[2]="<a href='managebilltime.php'>View Time by Project</a>"
   billing_tools[3]="<span class='navcat'><b>Invoices</b></span>"
   billing_tools[4]="<a href='makeinvoice.php'>Create New Invoice</a>"
   billing_tools[5]="<a href='viewinvoices.php'>View Invoices by Status</a>"
   billing_tools[6]="<span class='navcat'><b>Reports</b></span>"
   billing_tools[7]="<a href='reports_billing.php'>Billing Reports</a>"

   var support=new Array()
   support[0]="<a href='managesupport.php'>Manage Tickets</a>"
   support[1]="<a href='reports_support.php'>Reports</a>"

   var admin=new Array()
   admin[0]="<span class='navcat'><b>Settings</b></span>"
   admin[1]="<a href='settings.php'>System-wide Settings</a>"
   admin[2]="<a href='payment_settings.php'>Payment Settings</a>"
   admin[3]='<span class="navcat"><b></b></span>'
   admin[4]="<a href='addstaff.php'>Add Staff User</a>"
   admin[5]="<a href='managestaff.php'>Manage Staff</a>"
   admin[6]="<a href='mailer.php'>E-Mail Tool</a>"
   admin[7]="<a href='announcements.php'>System Announcements</a>"
   admin[8]="<span class='navcat'><b>Freelance Suite</b></span>"
   admin[9]="<a href='license.php'>License & Updates</a>"

   var my=new Array()
   my[0]="<a href='myaccount.php'>My Profile</a>"
   my[1]="<a href='mymessages.php'>My Messages</a>"
   my[2]="<a href='mytasks.php'>My Tasks</a>"
   my[3]="<a href='managemysupport.php'>My Tickets</a>"


   var menuwidth='165px' //default menu width
   var menubgcolor='#aeaeae'  //menu bgcolor
   var disappeardelay=10  //menu disappear speed onMouseout (in miliseconds)
   var hidemenu_onclick="yes" //hide menu when user clicks within menu?

   /////No further editting needed

   var ie4=document.all
   var ns6=document.getElementById&&!document.all

   if (ie4||ns6)
   document.write('<div id="dropmenudiv" style="visibility:hidden;width:'+menuwidth+';background-color:'+menubgcolor+'" onMouseover="clearhidemenu()" onMouseout="dynamichide(event)"></div>')

   function getposOffset(what, offsettype){
      var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
      var parentEl=what.offsetParent;
      while (parentEl!=null){
         totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
         parentEl=parentEl.offsetParent;
      }
      return totaloffset;
   }


   function showhide(obj, e, visible, hidden, menuwidth){
      if (ie4||ns6)
      dropmenuobj.style.left=dropmenuobj.style.top="-500px"
      if (menuwidth!=""){
         dropmenuobj.widthobj=dropmenuobj.style
         dropmenuobj.widthobj.width=menuwidth
      }
      if (e.type=="click" && obj.visibility==hidden || e.type=="mouseover")
      obj.visibility=visible
      else if (e.type=="click")
         obj.visibility=hidden
      }

      function iecompattest(){
         return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
      }

      function clearbrowseredge(obj, whichedge){
         var edgeoffset=0
         if (whichedge=="rightedge"){
            var windowedge=ie4 && !window.opera? iecompattest().scrollLeft+iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15
            dropmenuobj.contentmeasure=dropmenuobj.offsetWidth
            if (windowedge-dropmenuobj.x < dropmenuobj.contentmeasure)
            edgeoffset=dropmenuobj.contentmeasure-obj.offsetWidth
         }
         else{
            var topedge=ie4 && !window.opera? iecompattest().scrollTop : window.pageYOffset
            var windowedge=ie4 && !window.opera? iecompattest().scrollTop+iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
            dropmenuobj.contentmeasure=dropmenuobj.offsetHeight
            if (windowedge-dropmenuobj.y < dropmenuobj.contentmeasure){ //move up?
               edgeoffset=dropmenuobj.contentmeasure+obj.offsetHeight
               if ((dropmenuobj.y-topedge)<dropmenuobj.contentmeasure) //up no good either?
               edgeoffset=dropmenuobj.y+obj.offsetHeight-topedge
            }
         }
         return edgeoffset
      }

      function populatemenu(what){
         if (ie4||ns6)
         dropmenuobj.innerHTML=what.join("")
      }


      function dropdownmenu(obj, e, menucontents, menuwidth){
         if (window.event) event.cancelBubble=true
         else if (e.stopPropagation) e.stopPropagation()
            clearhidemenu()
            dropmenuobj=document.getElementById? document.getElementById("dropmenudiv") : dropmenudiv
            populatemenu(menucontents)

            if (ie4||ns6){
               showhide(dropmenuobj.style, e, "visible", "hidden", menuwidth)
               dropmenuobj.x=getposOffset(obj, "left")
               dropmenuobj.y=getposOffset(obj, "top")
               dropmenuobj.style.left=dropmenuobj.x-clearbrowseredge(obj, "rightedge")+"px"
               dropmenuobj.style.top=dropmenuobj.y-clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+"px"
            }

            return clickreturnvalue()
         }

         function clickreturnvalue(){
            if (ie4||ns6) return false
            else return true
            }

            function contains_ns6(a, b) {
               while (b.parentNode)
               if ((b = b.parentNode) == a)
               return true;
               return false;
            }

            function dynamichide(e){
               if (ie4&&!dropmenuobj.contains(e.toElement))
               delayhidemenu()
               else if (ns6&&e.currentTarget!= e.relatedTarget&& !contains_ns6(e.currentTarget, e.relatedTarget))
                  delayhidemenu()
               }

               function hidemenu(e){
                  if (typeof dropmenuobj!="undefined"){
                     if (ie4||ns6)
                     dropmenuobj.style.visibility="hidden"
                  }
               }

               function delayhidemenu(){
                  if (ie4||ns6)
                  delayhide=setTimeout("hidemenu()",disappeardelay)
               }

               function clearhidemenu(){
                  if (typeof delayhide!="undefined")
                  clearTimeout(delayhide)
               }

               if (hidemenu_onclick=="yes")
               document.onclick=hidemenu