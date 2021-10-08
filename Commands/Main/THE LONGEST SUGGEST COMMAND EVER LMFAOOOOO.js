module.exports = [{
name:"suggest",
aliases:"idea",
code:`$setmessagevar[suggester;$authorid;$get[e]]
$setuservar[suggestion;$message]
$let[e;$apimessage[$channelid;;{author:$usertag(ID#COLON# $authorid):$authoravatar:}{title:Confirm Your Request!}{description:Do you wish to post your suggestion, **$usertag**? The suggestion shall be redirected to <#$getservervar[schannel]>!}{field:How To Proceed?:Green Colored Confirm Button#COLON# Post the suggestion\nRed Color Cancel Button#COLON# Cancel the post:yes}{color:RANDOM}{footer:Suggestion ID(Number)#COLON# $get[number] | $servername:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]};{actionRow:Confirm,2,3,confirm,Verify|878559022515617832|true,false,:Cancel,2,4,cancel,cross|852150870610280468|true,false};$messageID:true;yes]]
$setuservar[attachment;$messageattachment]
$let[number;$sum[$getservervar[scount];1]]
$cooldown[$getservervar[cooldown];\`\`\`You are on a cooldown of **%time%**!\`\`\`]
$onlyif[$message!=;\`\`\`$getservervar[prefix]suggest <suggestion>\n\nArgument Missing: <suggestion>\`\`\`]
$onlyif[$getuservar[blacklist]==false;\`\`\`You are blacklisted from suggesting in **$servername**!\`\`\`]  
$onlyif[$channelexists[$getservervar[schannel]]==true;\`\`\`The server's suggestion channel was not found. Either it was not set, or it was deleted! \`\`\`]
$onlybotperms[embedlinks;\`\`\`I am missing permissions to Embed Links!\`\`\`]
$onlyif[$getservervar[staff_roles]!=;\`\`\`The server's staff roles are not yet set! Use **$getservervar[prefix]config staff roles @role mention array**\`\`\`]`
}, {
type:"interactionCommand",
prototype:"button",
name:"confirm",
code:`$if[$channelexists[$getservervar[logs]]==true]
$channelsendmessage[$findchannel[$getservervar[logs];no];{author:Suggestion Logs:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{title:Someone Just Confirmed A Suggestion Post!}{description:**$usertag**($authorid) confirmed their request of posting their suggestion!}{timestamp}{footer:#$channelname:$authoravatar}{image:$getuservar[attachment]}{color:GREEN};no]
$endif
$setvar[s;$sum[$getvar[s];1]]
$apimessage[$channelid;;{author:$usertag:$authoravatar:}{title:Success!}{description:I successfully posted your suggestion, feel free to click the button below to see it!}{color:RANDOM}{footer:$servername:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{timestamp};{actionRow:Suggestion Link,2,5,$replacetext[https://discord.com/channels/$guildid/$getservervar[schannel]/$get[e];:;:]};;no]
$setmessagevar[sstamp;$datestamp;$get[e]]
$setmessagevar[suggester;$authorid;$get[e]]
$setmessagevar[attachment;$getuservar[attachment];$get[e]]
$deletemessage[$interactiondata[message.id]]
$let[e;$apimessage[$getservervar[schannel];;{author:$usertag:$authoravatar:}{thumbnail:$authoravatar}{title:Suggestion #$get[number]}{description:$getuservar[suggestion]}{field:Votes:No One Has Upvoted Or Downvoted This Suggestion Yet!:no}{field:Status:None:no}{color:RANDOM}{footer:Click The Grey Button In Each Row To Know What The Buttons In That Row Perform! | $servername:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{image:$getuservar[attachment]}{timestamp};{actionRow:Voting,2,2,thoughts,,false,:,2,3,upvote,👍|0|false,false,:,2,4,downvote,👎|0|false,false,:,2,1,idk,🤷|0|false,false}{actionRow:Comments,2,2,commentmsg,,false,:,2,3,comment,➕|0|false,false,:,2,1,view,👀|0|false,false,:,2,4,removecomment,✖️|0|false,false}{actionRow:Decision,2,2,decide,,false,:,2,3,accept,Verify|878559022515617832|true,false,:,2,4,deny,cross|852150870610280468|true,false,:,2,1,consider,consider|878560575154683964|false,false}{actionRow:Misc,2,2,misc,,false,:,2,3,checkvote,✅|0|false,false,:,2,1,checkcomment,✔️|0|false,false,:,2,4,removevote,❌|0|false,false};;yes]]
$setservervar[scount;$get[number]]
$onlyif[$getmessagevar[suggester;$interactiondata[message.id]]==$authorid;]
$let[number;$sum[$getservervar[scount];1]]`
}, {
type:"interactionCommand",
prototype:"button",
name:"cancel",
code:`$if[$channelexists[$getservervar[logs]]==true]
$channelsendmessage[$findchannel[$getservervar[logs];no];{author:Suggestion Logs:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{title:Someone Just Cancelled A Suggestion Post!}{description:**$usertag**($authorid) cancelled their request of posting their suggestion!}{timestamp}{footer:#$channelname:$authoravatar}{color:FF0000};no]
$endif
$interactionreply[**Cancelled!**;;{actionRow:Confirm,2,3,confirm,Verify|878559022515617832|true,true,:Cancel,2,4,cancel,cross|852150870610280468|true,true};0;4]
$deletemessage[$interactiondata[message.id]]
$onlyif[$getmessagevar[suggester;$interactiondata[message.id]]==$authorid;]`
}, {
type:"interactionCommand",
prototype:"button",
name:"upvote",
code:`$if[$channelexists[$getservervar[logs]]==true]
$channelsendmessage[$findchannel[$getservervar[logs];no];{author:Suggestion Logs:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{title:Someone Just Upvoted A Suggestion!}{description:**$usertag**($authorid) upvoted [this suggestion](https://discord.com/channels/$guildid/$getservervar[schannel]/$interactiondata[message.id])}{timestamp}{footer:#$channelname:$authoravatar}{color:GREEN};no]
$endif
$interactionreply[;{author:$usertag[$getmessagevar[suggester;$get[m]]]:$useravatar[$getmessagevar[suggester;$get[m]]]:}{thumbnail:$useravatar[$getmessagevar[suggester;$get[m]]]}{title:$getembed[$getservervar[schannel];$get[m];title]}{description:$getembed[$getservervar[schannel];$get[m];description]}{field:Votes:\`Upvotes#COLON#\` $sum[$get[upvotes];1]\n\`Downvotes#COLON#\` $get[downvotes]\n\`Maybe#COLON#\` $get[maybe]:no}{color:RANDOM}{footer:Click The Grey Button In Each Row To Know What The Buttons In That Row Perform! | $servername | Last Upvoted At:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{image:$getmessagevar[attachment;$get[m]]}{timestamp};{actionRow:Voting,2,2,thoughts,,false,:,2,3,upvote,👍|0|false,false,:,2,4,downvote,👎|0|false,false,:,2,1,idk,🤷|0|false,false}{actionRow:Comments,2,2,commentmsg,,false,:,2,3,comment,➕|0|false,false,:,2,1,view,👀|0|false,false,:,2,4,removecomment,✖️|0|false,false}{actionRow:Decision,2,2,decide,,false,:,2,3,accept,Verify|878559022515617832|true,false,:,2,4,deny,cross|852150870610280468|true,false,:,2,1,consider,consider|878560575154683964|false,false}{actionRow:Misc,2,2,misc,,false,:,2,3,checkvote,✅|0|false,false,:,2,1,checkcomment,✔️|0|false,false,:,2,4,removevote,❌|0|false,false};;7]
$setuservar[voted;**UPVOTED**;$interactiondata[message.id]$authorid]
$setmessagevar[upvotes;$sum[$get[upvotes];1];$get[m]]
$let[upvotes;$getmessagevar[upvotes;$get[m]]]
$let[downvotes;$getmessagevar[downvotes;$get[m]]]
$let[maybe;$getmessagevar[maybe;$get[m]]]
$onlyif[$getuservar[voted;$get[m]$authorid]==;{execute:voted}]
$let[m;$interactiondata[message.id]]`},
{
type:"interactionCommand",
prototype:"button",
name:"downvote",
code:`$if[$channelexists[$getservervar[logs]]==true]
$channelsendmessage[$findchannel[$getservervar[logs];no];{author:Suggestion Logs:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{title:Someone Just Downvoted A Suggestion!}{description:**$usertag**($authorid) downvoted [this suggestion](https://discord.com/channels/$guildid/$getservervar[schannel]/$interactiondata[message.id])}{timestamp}{footer:#$channelname:$authoravatar}{color:FF0000};no]
$endif
$interactionreply[;{author:$usertag[$getmessagevar[suggester;$get[m]]]:$useravatar[$getmessagevar[suggester;$get[m]]]:}{thumbnail:$useravatar[$getmessagevar[suggester;$get[m]]]}{title:$getembed[$getservervar[schannel];$get[m];title]}{description:$getembed[$getservervar[schannel];$get[m];description]}{field:Votes:\`Upvotes#COLON#\` $get[upvotes]\n\`Downvotes#COLON#\` $sum[$get[downvotes];1]\n\`Maybe#COLON#\` $get[maybe]:no}{color:RANDOM}{footer:Click The Grey Button In Each Row To Know What The Buttons In That Row Perform! | $servername | Last Downvoted At:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{image:$getmessagevar[attachment;$get[m]]}{timestamp};{actionRow:Voting,2,2,thoughts,,false,:,2,3,upvote,👍|0|false,false,:,2,4,downvote,👎|0|false,false,:,2,1,idk,🤷|0|false,false}{actionRow:Comments,2,2,commentmsg,,false,:,2,3,comment,➕|0|false,false,:,2,1,view,👀|0|false,false,:,2,4,removecomment,✖️|0|false,false}{actionRow:Decision,2,2,decide,,false,:,2,3,accept,Verify|878559022515617832|true,false,:,2,4,deny,cross|852150870610280468|true,false,:,2,1,consider,consider|878560575154683964|false,false}{actionRow:Misc,2,2,misc,,false,:,2,3,checkvote,✅|0|false,false,:,2,1,checkcomment,✔️|0|false,false,:,2,4,removevote,❌|0|false,false};;7]
$setuservar[voted;**DOWNVOTED**;$interactiondata[message.id]$authorid]
$setmessagevar[downvotes;$sum[$get[downvotes];1];$get[m]]
$let[upvotes;$getmessagevar[upvotes;$get[m]]]
$let[downvotes;$getmessagevar[downvotes;$get[m]]]
$let[maybe;$getmessagevar[maybe;$get[m]]]
$onlyif[$getuservar[voted;$get[m]$authorid]==;{execute:voted}]
$let[m;$interactiondata[message.id]]`},
{
type:"interactionCommand",
prototype:"button",
name:"idk",
code:`$if[$channelexists[$getservervar[logs]]==true]
$channelsendmessage[$findchannel[$getservervar[logs];no];{author:Suggestion Logs:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{title:Someone Just Voted For Maybe For A Suggestion!}{description:**$usertag**($authorid) voted for maybe for [this suggestion](https://discord.com/channels/$guildid/$getservervar[schannel]/$interactiondata[message.id])}{timestamp}{footer:#$channelname:$authoravatar}{color:FFFF00};no]
$endif
$interactionreply[;{author:$usertag[$getmessagevar[suggester;$get[m]]]:$useravatar[$getmessagevar[suggester;$get[m]]]:}{thumbnail:$useravatar[$getmessagevar[suggester;$get[m]]]}{title:$getembed[$getservervar[schannel];$get[m];title]}{description:$getembed[$getservervar[schannel];$get[m];description]}{field:Votes:\`Upvotes#COLON#\` $get[upvotes]\n\`Downvotes#COLON#\` $get[downvotes]\n\`Maybe#COLON#\` $sum[$get[maybe];1]:no}{color:RANDOM}{footer:Click The Grey Button In Each Row To Know What The Buttons In That Row Perform! | $servername | Last Maybe Vote At:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{image:$getmessagevar[attachment;$get[m]]}{timestamp};{actionRow:Voting,2,2,thoughts,,false,:,2,3,upvote,👍|0|false,false,:,2,4,downvote,👎|0|false,false,:,2,1,idk,🤷|0|false,false}{actionRow:Comments,2,2,commentmsg,,false,:,2,3,comment,➕|0|false,false,:,2,1,view,👀|0|false,false,:,2,4,removecomment,✖️|0|false,false}{actionRow:Decision,2,2,decide,,false,:,2,3,accept,Verify|878559022515617832|true,false,:,2,4,deny,cross|852150870610280468|true,false,:,2,1,consider,consider|878560575154683964|false,false}{actionRow:Misc,2,2,misc,,false,:,2,3,checkvote,✅|0|false,false,:,2,1,checkcomment,✔️|0|false,false,:,2,4,removevote,❌|0|false,false};;7]
$setuservar[voted;**VOTED MAYBE FOR**;$interactiondata[message.id]$authorid]
$setmessagevar[maybe;$sum[$get[maybe];1];$get[m]]
$let[upvotes;$getmessagevar[upvotes;$get[m]]]
$let[downvotes;$getmessagevar[downvotes;$get[m]]]
$let[maybe;$getmessagevar[maybe;$get[m]]]
$onlyif[$getuservar[voted;$get[m]$authorid]==;]
$let[m;$interactiondata[message.id]]`
}, {
type:"awaitedCommand",
name:"voted",
code:`$senddm[$authorid;Hi **$usertag**, it seems that you have already voted the suggestion you just voted again, which is the reason you recieved the *This interaction failed*  error, and you cant vote twice! However, if you feel you misclicked your vote, you can remove it by clicking that button!]`
}, {
type:"interactionCommand",
prototype:"button",
name:"checkvote",
code:`$interactionreply[<@$authorid>, you have $getuservar[voted;$get[m]$authorid] this suggestion!;;;64]
$onlyif[$getuservar[voted;$get[m]$authorid]!=;{execute:notvoted}]
$let[m;$interactiondata[message.id]]
$cooldown[10s;{execute:cd}]`
}, {
type:"awaitedCommand",
name:"notvoted",
code:`$senddm[$authorid;Hi **$usertag**, it seems that you have not voted the suggestion you just clicked, which is the reason you recieved the *This interaction failed*  error! Feel free to vote by clicking the correct button!]`
}, {
type:"interactionCommand",
prototype:"button",
name:"checkcomment",
code:`$if[$getservervar[scomments]==false]
$interactionreply[Comments are **disabled** on this server!;;;64]
$else
$interactionreply[<@$authorid>, you have commented "$advancedtextsplit[$getmessagevar[comments;$get[m]];ℏ;$findtextsplitindex[$authorid]]" on this suggestion on <t:$advancedtextsplit[$math[$advancedtextsplit[$getmessagevar[timestamps;$get[m]];ℏ;$findtextsplitindex[$authorid]]/1000];.;1]>!;;;64]
$textsplit[$getmessagevar[users;$get[m]];ℏ]
$onlyif[$checkcontains[$getmessagevar[users;$get[m]];$authorid]==true;{execute:nocomment}]
$let[m;$interactiondata[message.id]]
$cooldown[10s;{execute:cd}]
$endif`
}, {
type:"awaitedCommand",
name:"nocomment",
code:`$senddm[$authorid;Hi **$usertag**, it seems that you have not commented on the suggestion you just clicked, which is the reason you recieved the *This interaction failed*  error! Feel free to comment by clicking the correct button!]`
}, {
type:"interactionCommand",
prototype:"button",
name:"removevote",
code:`$setuservar[voted;;$interactiondata[message.id]$authorid]
$interactionreply[;{author:$usertag[$getmessagevar[suggester;$get[m]]]:$useravatar[$getmessagevar[suggester;$get[m]]]:}{thumbnail:$useravatar[$getmessagevar[suggester;$get[m]]]}{title:$getembed[$getservervar[schannel];$get[m];title]}{description:$getembed[$getservervar[schannel];$get[m];description]}{field:Votes:$replacetext[\`Upvotes#COLON#\` $get[upvotes]\n\`Downvotes#COLON#\` $get[downvotes]\n\`Maybe#COLON#\` $get[maybe];\n\n;\n]:no}{color:RANDOM}{footer:Click The Grey Button In Each Row To Know What The Buttons In That Row Perform! | $servername | Last Maybe Vote At:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{image:$getmessagevar[attachment;$get[m]]}{timestamp};{actionRow:Voting,2,2,thoughts,,false,:,2,3,upvote,👍|0|false,false,:,2,4,downvote,👎|0|false,false,:,2,1,idk,🤷|0|false,false}{actionRow:Comments,2,2,commentmsg,,false,:,2,3,comment,➕|0|false,false,:,2,1,view,👀|0|false,false,:,2,4,removecomment,✖️|0|false,false}{actionRow:Decision,2,2,decide,,false,:,2,3,accept,Verify|878559022515617832|true,false,:,2,4,deny,cross|852150870610280468|true,false,:,2,1,consider,consider|878560575154683964|false,false}{actionRow:Misc,2,2,misc,,false,:,2,3,checkvote,✅|0|false,false,:,2,1,checkcomment,✔️|0|false,false,:,2,4,removevote,❌|0|false,false};;7]
$senddm[$authorid;I successfully removed your vote from that suggestion!]
$setmessagevar[$get[vote];$sub[$getmessagevar[$get[vote];$get[m]];1];$get[m]]
$let[upvotes;$sub[$getmessagevar[upvotes;$get[m]];$replacetext[$replacetext[$checkcondition[$get[vote]==upvotes];true;1];false;0]]]
$let[downvotes;$sub[$getmessagevar[downvotes;$get[m]];$replacetext[$replacetext[$checkcondition[$get[vote]==downvotes];true;1];false;0]]]
$if[$channelexists[$getservervar[logs]]==true]
$channelsendmessage[$findchannel[$getservervar[logs];no];{author:Suggestion Logs:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{title:Someone Just Removed Their Vote From A Suggestion!}{description:**$usertag**($authorid) removed their $replacetext[$getuservar[voted;$interactiondata[message.id]$authorid];D;] from [this suggestion](https://discord.com/channels/$guildid/$getservervar[schannel]/$interactiondata[message.id])!}{timestamp}{footer:#$channelname:$authoravatar}{color:FF0000};no]
$endif
$let[maybe;$sub[$getmessagevar[maybe;$get[m]];$replacetext[$replacetext[$checkcondition[$get[vote]==maybe];true;1];false;0]]]
$let[vote;$replacetext[$replacetext[$checkcondition[$getuservar[voted;$get[m]$authorid]==**VOTED MAYBE FOR**];true;maybe];false;$replacetext[$replacetext[$checkcondition[$getuservar[voted;$get[m]$authorid]==**DOWNVOTED**];true;downvotes];false;upvotes]]]
$onlyif[$getuservar[voted;$get[m]$authorid]!=;{execute:notvoted}]
$let[m;$interactiondata[message.id]]
$cooldown[10s;{execute:cd}]`
}, {
type:"awaitedCommand",
name:"notvoted",
code:`$senddm[$authorid;Hi **$usertag**, it seems that you have not voted for that suggestion yet,  which is the reason you recieved the *This interaction failed*  error! Feel free to vote by clicking the correct button!]`
}, {
type:"interactionCommand",
prototype:"button",
name:"removecomment",
code:`$if[$channelexists[$getservervar[logs]]==true]
$channelsendmessage[$findchannel[$getservervar[logs];no];{author:Suggestion Logs:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{title:Someone Just Removed Their Comment From A Suggestion!}{description:**$usertag**($authorid) removed their comment from [this suggestion](https://discord.com/channels/$guildid/$getservervar[schannel]/$interactiondata[message.id])!}{timestamp}{footer:#$channelname:$authoravatar}{color:FF0000};no]
$endif
$interactionreply[I removed your comment from this suggestion!;;;64]
$setmessagevar[users;$replacetext[$getmessagevar[users;$get[m]];$authoridℏ;];$get[m]]
$setmessagevar[timestamps;$joinsplittext[ℏ];$get[m]]
$removetextsplitelement[$get[i]]
$textsplit[$getmessagevar[timestamps;$get[m]];ℏ]
$setmessagevar[comments;$joinsplittext[ℏ];$get[m]]
$removetextsplitelement[$get[i]]
$textsplit[$getmessagevar[comments;$get[m]];ℏ]
$let[i;$findtextsplitindex[$authorid]]
$textsplit[$getmessagevar[users;$get[m]];ℏ]
$onlyif[$checkcontains[$getmessagevar[users;$get[m]];$authorid]==true;{execute:nocomment}]
$let[m;$interactiondata[message.id]]
$cooldown[10s;{execute:cd}]`
}, {
type:"awaitedCommand",
name:"cd",
code:`$senddm[$authorid;Hi **$usertag**, you are on a cooldown of clicking the buttons! The cooldown is of **10 seconds** by default and CANNOT be changed!]`
}, {
type:"interactionCommand",
prototype:"button",
name:"accept",
code:`$if[$textsplit[$getservervar[staff_roles];/]$checkcontains[$userroles[$authorid;ids;.];$joinsplittext[;]]$textsplit[$getservervar[staff_roles];/]!=true]
$interactionreply[You do not have one of the staff roles to execute this!;;;64]
$else
$interactionreply[Please message here, the reason for accepting this suggestion! Input **NONE** if there is none!(case does not matter);;;64]
$awaitmessages[$authorid;5m;everything;reason;]
$setuservar[rmid;$interactiondata[message.id]]
$endif`
}, {
type:"awaitedCommand",
name:"reason",
code:`$deletecommand
$setuservar[vr;$message;$get[number]]
$editmessage[$get[m];{author:$usertag[$get[user]]:$useravatar[$get[user]]:}{thumbnail:$useravatar[$get[user]]}{title:$getembed[$getservervar[schannel];$get[m];title] Accepted!}{description:$getembed[$getservervar[schannel];$get[m];description]}{field:Votes:\`Upvotes#COLON#\` $get[upvotes]\n\`Downvotes#COLON#\` $get[downvotes]\n\`Maybe#COLON#\` $get[maybe]:no}{field:Status:Implemented}{field:Comment By $usertag:$replacetext[$replacetext[$checkcondition[$tolowercase[$message]==none];true;No reason was provided];false;$replacetext[$replacetext[$checkcondition[$charcount[$message]>1096];true;Too long to display on this embed. Kindly use \`$getservervar[prefix]reason $get[number]\` to know it.];false;\`$replacetext[$message;\`;]\`]]:no}{color:00FF00}{footer:Original Suggestion Posted At:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{image:$getmessagevar[attachment;$get[m]]}{timestamp:$getmessagevar[sstamp;$get[m]]}]
$if[$channelexists[$getservervar[logs]]==true]
$channelsendmessage[$findchannel[$getservervar[logs];no];{author:Suggestion Logs:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{title:Someone Just Accepted A Suggestion!}{description:**$usertag**($authorid) accepted [this suggestion](https://discord.com/channels/$guildid/$getservervar[schannel]/$getuservar[rmid]). Reason provided: $replacetext[$replacetext[$checkcondition[$message==];true;None];false;"$message"]!}{timestamp}{footer:#$channelname:$authoravatar}{color:GREEN};no]
$endif
$let[number;$findnumbers[$getembed[$getservervar[schannel];$get[m];title]]]
$let[user;$getmessagevar[suggester;$get[m]]]
$let[upvotes;$getmessagevar[upvotes;$get[m]]]
$let[downvotes;$getmessagevar[downvotes;$get[m]]]
$let[maybe;$getmessagevar[maybe;$get[m]]]
$let[m;$getuservar[rmid]]
$if[$getservervar[dm]==true]
$senddm[$get[user];Hello **$usertag[$get[user]]**, one of the suggestions you made has been **ACCEPTED** by <@$authorid>(**$usertag**){author:$usertag[$get[user]]:$useravatar[$get[user]]:}{thumbnail:$useravatar[$get[user]]}{title:$getembed[$getservervar[schannel];$get[m];title] Accepted!}{description:$getembed[$getservervar[schannel];$get[m];description]}{field:Votes:\`Upvotes#COLON#\` $get[upvotes]\n\`Downvotes#COLON#\` $get[downvotes]\n\`Maybe#COLON#\` $get[maybe]:no}{field:Status:Implemented}{field:Comment By $usertag• <t#COLON#$advancedtextsplit[$math[$datestamp/1000];.;1]>:$replacetext[$replacetext[$checkcondition[$tolowercase[$message]==none];true;No reason was provided];false;$replacetext[$replacetext[$checkcondition[$charcount[$message]>1096];true;Too long to display on this embed. Kindly use \`$getservervar[prefix]reason $get[number]\` in **$servername** to know it!];false;\`$replacetext[$message;\`;]\`]]:no}{color:00FF00}{footer:Accepted by $usertag(ID#COLON# $authorid):$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{timestamp:$getmessagevar[sstamp;$get[m]]}]
$let[number;$findnumbers[$getembed[$getservervar[schannel];$get[m];title]]]
$let[user;$getmessagevar[suggester;$get[m]]]
$let[upvotes;$getmessagevar[upvotes;$get[m]]]
$let[downvotes;$getmessagevar[downvotes;$get[m]]]
$let[maybe;$getmessagevar[maybe;$get[m]]]
$let[m;$getuservar[rmid]]
$endif`
}, {
type:"interactionCommand",
prototype:"button",
name:"deny",
code:`$if[$textsplit[$getservervar[staff_roles];/]$checkcontains[$userroles[$authorid;ids;.];$joinsplittext[;]]$textsplit[$getservervar[staff_roles];/]!=true]
$interactionreply[You do not have one of the staff roles to execute this!;;;64]
$else
$interactionreply[Please message here, the reason for declining this suggestion! Input **NONE** if there is none!(case does not matter);;;64]
$awaitmessages[$authorid;5m;everything;dreason;]
$setuservar[rmid;$interactiondata[message.id]]
$endif`
}, {
type:"awaitedCommand",
name:"dreason",
code:`$deletecommand
$setuservar[vr;$message;$get[number]]
$editmessage[$get[m];{author:$usertag[$get[user]]:$useravatar[$get[user]]:}{thumbnail:$useravatar[$get[user]]}{title:$getembed[$getservervar[schannel];$get[m];title] Declined!}{description:$getembed[$getservervar[schannel];$get[m];description]}{field:Votes:\`Upvotes#COLON#\` $get[upvotes]\n\`Downvotes#COLON#\` $get[downvotes]\n\`Maybe#COLON#\` $get[maybe]:no}{field:Status:Declined}{field:Comment By $usertag:$replacetext[$replacetext[$checkcondition[$tolowercase[$message]==none];true;No reason was provided];false;$replacetext[$replacetext[$checkcondition[$charcount[$message]>1096];true;Too long to display on this embed. Kindly use \`$getservervar[prefix]reason $get[number]\` to know it.];false;\`$replacetext[$message;\`;]\`]]:no}{color:FF0000}{footer:Original Suggestion Posted At:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{image:$getmessagevar[attachment;$get[m]]}{timestamp:$getmessagevar[sstamp;$get[m]]}]
$let[number;$findnumbers[$getembed[$getservervar[schannel];$get[m];title]]]
$if[$channelexists[$getservervar[logs]]==true]
$channelsendmessage[$findchannel[$getservervar[logs];no];{author:Suggestion Logs:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{title:Someone Just Declined A Suggestion!}{description:**$usertag**($authorid) declined [this suggestion](https://discord.com/channels/$guildid/$getservervar[schannel]/$getuservar[rmid]). Reason provided: $replacetext[$replacetext[$checkcondition[$message==];true;None];false;"$message"]!}{timestamp}{footer:#$channelname:$authoravatar}{color:FF0000};no]
$endif
$let[user;$getmessagevar[suggester;$get[m]]]
$let[upvotes;$getmessagevar[upvotes;$get[m]]]
$let[downvotes;$getmessagevar[downvotes;$get[m]]]
$let[maybe;$getmessagevar[maybe;$get[m]]]
$let[m;$getuservar[rmid]]
$if[$getservervar[dm]==true]
$senddm[$get[user];Hello **$usertag[$get[user]]**, one of the suggestions you made has been **DECLINED** by <@$authorid>(**$usertag**){author:$usertag[$get[user]]:$useravatar[$get[user]]:}{thumbnail:$useravatar[$get[user]]}{title:$getembed[$getservervar[schannel];$get[m];title] Declined!}{description:$getembed[$getservervar[schannel];$get[m];description]}{field:Votes:\`Upvotes#COLON#\` $get[upvotes]\n\`Downvotes#COLON#\` $get[downvotes]\n\`Maybe#COLON#\` $get[maybe]:no}{field:Status:Implemented}{field:Comment By $usertag• <t#COLON#$advancedtextsplit[$math[$datestamp/1000];.;1]>:$replacetext[$replacetext[$checkcondition[$tolowercase[$message]==none];true;No reason was provided];false;$replacetext[$replacetext[$checkcondition[$charcount[$message]>1096];true;Too long to display on this embed. Kindly use \`$getservervar[prefix]reason $get[number]\` in **$servername** to know it!];false;\`$replacetext[$message;\`;]\`]]:no}{color:FF0000}{footer:Declined by $usertag(ID#COLON# $authorid):$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{timestamp}]
$let[number;$findnumbers[$getembed[$getservervar[schannel];$get[m];title]]]
$let[user;$getmessagevar[suggester;$get[m]]]
$let[upvotes;$getmessagevar[upvotes;$get[m]]]
$let[downvotes;$getmessagevar[downvotes;$get[m]]]
$let[maybe;$getmessagevar[maybe;$get[m]]]
$let[m;$getuservar[rmid]]
$endif`
}, {
type:"interactionCommand",
prototype:"button",
name:"consider",
code:`$if[$textsplit[$getservervar[staff_roles];/]$checkcontains[$userroles[$authorid;ids;.];$joinsplittext[;]]$textsplit[$getservervar[staff_roles];/]!=true]
$interactionreply[You do not have one of the staff roles to execute this!;;;64]
$else
$interactionreply[Please message here, the reason for considering this suggestion! Input **NONE** if there is none!(case does not matter);;;64]
$awaitmessages[$authorid;5m;everything;mreason;]
$setuservar[rmid;$interactiondata[message.id]]
$endif`
}, {
type:"awaitedCommand",
name:"mreason",
code:`$deletecommand
$setuservar[vr;$message;$get[number]]
$editmessage[$get[m];{author:$usertag[$get[user]]:$useravatar[$get[user]]:}{thumbnail:$useravatar[$get[user]]}{title:$getembed[$getservervar[schannel];$get[m];title] Considered!}{description:$getembed[$getservervar[schannel];$get[m];description]}{field:Votes:\`Upvotes#COLON#\` $get[upvotes]\n\`Downvotes#COLON#\` $get[downvotes]\n\`Maybe#COLON#\` $get[maybe]:no}{field:Status:In Consideration}{field:Comment By $usertag:$replacetext[$replacetext[$checkcondition[$tolowercase[$message]==none];true;No reason was provided];false;$replacetext[$replacetext[$checkcondition[$charcount[$message]>1096];true;Too long to display on this embed. Kindly use \`$getservervar[prefix]reason $get[number]\` to know it.];false;\`$replacetext[$message;\`;]\`]]:no}{color:FFFF00}{footer:Original Suggestion Posted At:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{image:$getmessagevar[attachment;$get[m]]}{timestamp:$getmessagevar[sstamp;$get[m]]}]
$let[number;$findnumbers[$getembed[$getservervar[schannel];$get[m];title]]]
$if[$channelexists[$getservervar[logs]]==true]
$channelsendmessage[$findchannel[$getservervar[logs];no];{author:Suggestion Logs:$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{title:Someone Just Considered A Suggestion!}{description:**$usertag**($authorid) considered [this suggestion](https://discord.com/channels/$guildid/$getservervar[schannel]/$getglobaluservar[rmid]). Comment: $replacetext[$replacetext[$checkcondition[$message==];true;None];false;"$message"!]}{timestamp}{footer:#$channelname:$authoravatar}{color:FFFF00};no]
$endif
$let[user;$getmessagevar[suggester;$get[m]]]
$let[upvotes;$getmessagevar[upvotes;$get[m]]]
$let[downvotes;$getmessagevar[downvotes;$get[m]]]
$let[maybe;$getmessagevar[maybe;$get[m]]]
$let[m;$getuservar[rmid]]
$if[$getservervar[dm]==true]
$senddm[$get[user];Hello **$usertag[$get[user]]**, one of the suggestions you made has been **CONSIDERED** by <@$authorid>(**$usertag**){author:$usertag[$get[user]]:$useravatar[$get[user]]:}{thumbnail:$useravatar[$get[user]]}{title:$getembed[$getservervar[schannel];$get[m];title] Considered!}{description:$getembed[$getservervar[schannel];$get[m];description]}{field:Votes:\`Upvotes#COLON#\` $get[upvotes]\n\`Downvotes#COLON#\` $get[downvotes]\n\`Maybe#COLON#\` $get[maybe]:no}{field:Status:Implemented}{field:Comment By $usertag• <t#COLON#$advancedtextsplit[$math[$datestamp/1000];.;1]>:$replacetext[$replacetext[$checkcondition[$tolowercase[$message]==none];true;No reason was provided];false;$replacetext[$replacetext[$checkcondition[$charcount[$message]>1096];true;Too long to display on this embed. Kindly use \`$getservervar[prefix]reason $get[number]\` to know it.];false;\`$replacetext[$message;\`;]\`]]:no}{color:FFFF00}{footer:Considered by $usertag(ID#COLON# $authorid):$replacetext[$replacetext[$isvalidlink[$servericon];true;$servericon];false;]}{timestamp}]
$let[number;$findnumbers[$getembed[$getservervar[schannel];$get[m];title]]]
$let[user;$getmessagevar[suggester;$get[m]]]
$let[upvotes;$getmessagevar[upvotes;$get[m]]]
$let[downvotes;$getmessagevar[downvotes;$get[m]]]
$let[maybe;$getmessagevar[maybe;$get[m]]]
$let[m;$getuservar[rmid]]
$endif`
}, {
type:"interactionCommand",
prototype:"button",
name:"comment",
code:`$if[$getservervar[scomments]==false]
$interactionreply[Comments are **disabled** on this server!;;;64]
$else
$interactionreply[<@$authorid>, DM me what you would like to comment. Take your time to comment, however this is reversible!;;;64]
$awaitmessages[$authorid;5m;everything;comment;;$authorid]
$setglobaluservar[rmid;$interactiondata[message.id]]
$setglobaluservar[server;$guildid]
$onlyif[$checkcontains[$getmessagevar[users;$interactiondata[message.id]];$authorid]==false;{execute:commentdone}]
$endif`
}, {
type:"awaitedCommand",
name:"commentdone",
code:`$senddm[$authorid;Hello **$usertag**, you have already commented on that suggestion! Feel free to remove it if you wish to comment again!]`
}, {
type:"awaitedCommand",
name:"comment",
code:`$if[$channelexists[$getservervar[logs;$getglobaluservar[server]]]==true]
$channelsendmessage[$getservervar[logs;$getglobaluservar[server]];{author:Suggestion Logs:$replacetext[$replacetext[$isvalidlink[$servericon[$getglobaluservar[server]]];true;$servericon[$getglobaluservar[server]]];false;]}{title:Someone Just Commented On A Suggestion!}{description:**$usertag**($authorid) commented on [this suggestion](https://discord.com/channels/$getglobaluservar[server]/$getservervar[schannel;$getglobaluservar[server]]/$getglobaluservar[rmid]). Comment: "$message"!}{timestamp}{footer:Click the comment button in that message to view all comments of that suggestion!:$authoravatar}{color:GREEN};no]
$endif
Thank you for your comment!
$setmessagevar[comments;$replacetext[$message;ℏ;h]ℏ$getmessagevar[comments;$get[m]];$get[m]]
$setmessagevar[users;$authoridℏ$getmessagevar[users;$get[m]];$get[m]]
$setmessagevar[timestamps;$datestampℏ$getmessagevar[timestamps;$get[m]];$get[m]]
$let[m;$getglobaluservar[rmid]]`
}, {
type:"interactionCommand",
prototype:"button",
name:"view",
code:`$if[$getservervar[scomments]==false]
$interactionreply[Comments are **disabled** on this server!;;;64]
$else
$if[$textsplit[$getservervar[staff_roles];/]$checkcontains[$userroles[$authorid;ids;.];$joinsplittext[;]]$textsplit[$getservervar[staff_roles];/]!=true]
$interactionreply[You do not have one of the staff roles to execute this!;;;64]
$else
$interactionreply[;{author:$usertag[$get[user]]:$useravatar[$get[user]]}{color:RANDOM}{title:Here is the comment by $username[$get[user]]}{description:$get[comment]}{footer:Comment #$getuservar[page]/$sub[$gettextsplitlength;1]}{timestamp:$get[timestamp]};{actionRow:Previous Page,2,2,previous,⬅️|0|false,false,:Next Page,2,2,next,➡️|0|false,false};64]
$textsplit[$getmessagevar[users;$get[m]];ℏ]
$let[user;$advancedtextsplit[$getmessagevar[users;$get[m]];ℏ;$get[page]]]
$setuservar[rmid;$get[m]]
$let[comment;$advancedtextsplit[$getmessagevar[comments;$get[m]];ℏ;$get[page]]]
$let[timestamp;$advancedtextsplit[$getmessagevar[timestamps;$get[m]];ℏ;$get[page]]]
$setuservar[page;$get[page]]
$let[page;1]
$onlyif[$getmessagevar[comments;$get[m]]!=;{execute:nocomments}]
$let[m;$interactiondata[message.id]]
$endif
$endif`
}, {
type:"awaitedCommand",
name:"nocomments",
code:`$senddm[$authorid;Hello **$usertag**, that suggestion has no comments!]`
}, {
type:"interactionCommand",
prototype:"button",
name:"next",
code:`$interactionreply[;{author:$usertag[$get[user]]:$useravatar[$get[user]]}{color:RANDOM}{title:Here is the comment by $username[$get[user]]}{description:$get[comment]}{footer:Comment #$getuservar[page]/$sub[$gettextsplitlength;1]}{timestamp:$get[timestamp]};{actionRow:Previous Page,2,2,previous,⬅️|0|false,false,:Next Page,2,2,next,➡️|0|false,false};;7]
$let[user;$advancedtextsplit[$getmessagevar[users;$get[m]];ℏ;$get[page]]]
$let[comment;$advancedtextsplit[$getmessagevar[comments;$get[m]];ℏ;$get[page]]]
$let[timestamp;$advancedtextsplit[$getmessagevar[timestamps;$get[m]];ℏ;$get[page]]]
$setuservar[page;$get[page]]
$let[page;$replacetext[$replacetext[$checkcondition[$sum[$getuservar[page];1]==$gettextsplitlength];true;1];false;$sum[$getuservar[page];1]]]
$textsplit[$getmessagevar[users;$get[m]];ℏ]
$let[m;$getuservar[rmid]]`
}, {
type:"interactionCommand",
prototype:"button",
name:"previous",
code:`$interactionreply[;{author:$usertag[$get[user]]:$useravatar[$get[user]]}{color:RANDOM}{title:Here is the comment by $username[$get[user]]}{description:$get[comment]}{footer:Comment #$getuservar[page]/$sub[$gettextsplitlength;1]}{timestamp:$get[timestamp]};{actionRow:Previous Page,2,2,previous,⬅️|0|false,false,:Next Page,2,2,next,➡️|0|false,false};;7]
$let[user;$advancedtextsplit[$getmessagevar[users;$get[m]];ℏ;$get[page]]]
$let[comment;$advancedtextsplit[$getmessagevar[comments;$get[m]];ℏ;$get[page]]]
$let[timestamp;$advancedtextsplit[$getmessagevar[timestamps;$get[m]];ℏ;$get[page]]]
$setuservar[page;$get[page]]
$let[page;$replacetext[$replacetext[$checkcondition[$sub[$getuservar[page];1]==0];true;$sub[$gettextsplitlength;1]];false;$sub[$getuservar[page];1]]]
$textsplit[$getmessagevar[users;$get[m]];ℏ]
$let[m;$getuservar[rmid]]`
}, {
type:"interactionCommand",
prototype:"button",
name:"thoughts",
code:`$interactionreply[:thumbsup: — Upvote The Suggestion\n\n:thumbsdown: — Downvote The Suggestion\n\n:man_shrugging: — Vote For Maybe;;;64]`
}, {
type:"interactionCommand",
prototype:"button",
name:"commentmsg",
code:`$interactionreply[➕ — Add A Comment\n\n:eyes: — View Comments (Staff Roles Only)\n\n✖️ — Remove Your Comment;;;64]`
}, {
type:"interactionCommand",
prototype:"button",
name:"decide",
code:`$interactionreply[<a:Verify:878559022515617832> — Accept The Suggestion (Staff Roles Only)\n\n<a:cross:852150870610280468> — Deny The Suggestion (Staff Roles Only)\n\n<:consider:878560575154683964> — Consiser The Suggestion (Staff Roles Only);;;64]`
}, {
type:"interactionCommand",
prototype:"button",
name:"misc",
code:`$interactionreply[✅ — Check Your Vote\n\n✔️ — Check Your Comment\n\n❌ — Remove Your Vote;;;64]`
}]
