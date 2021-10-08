module.exports = ({
name:"config",
aliases:"setup",
code:`$if[$tolowercase[$message[1]]==staff]
$if[$tolowercase[$message[2]]==roles]
$setservervar[staff_roles;$djseval[let res = mentions.roles.map(x=>x.id)
d.array = res.join("/");yes]]
I set **$djseval[let res = mentions.roles.map(x=>x.name)
d.array = res.join("**, **");yes]** as the roles which are the staff roles!

\`\`\`Important Note: Please make sure you give the "send messages" permissions to the roles you have entered as the staff roles in the suggestions channel. This means that if your suggestions channel is #suggestions(example), then modify the permissions of #suggestions to allow these roles to send messages!\`\`\`
$onlyif[$mentionedroles[1]!=;\`\`\`You need to mention atleast 1 role as the staff role!\`\`\`]
$onlyperms[manageserver;\`\`\`You need the **Manage Server** permissions for this!\`\`\`]
$elseif[$tolowercase[$message[2]]==logs]
$setservervar[logs;$mentionedchannels[1]]
The logs were successfully set to <#$mentionedchannels[1]>!
$onlyif[$mentionedchannels[1]!=;\`\`\`Mention atleast 1 channel!\`\`\`]
$onlyif[$checkcontains[$userroles[$authorid;ids;.];$joinsplittext[;]]==true;\`\`\`You do not have any of the staff roles of the server!\`\`\`]
$textsplit[$getservervar[staff_roles];/]
$onlyif[$getservervar[staff_roles]!=;\`\`\`The server's staff roles are not yet set! Use **$getservervar[prefix]config staff role(s) @role mention array**\`\`\`]
$endelseif
$else
\`\`\`$usertag, there are 2 options you can choose to config:
1. $getservervar[prefix]config staff roles @array of role mentions
2. $getservervar[prefix]config staff logs #channel-for-logs\`\`\`
$endif
$elseif[$tolowercase[$message[1]]==suggestions]
$if[$tolowercase[$message[2]]==cooldown]
$setservervar[cooldown;$message[3]]
I successfully set the suggestions cooldown to **$parsedate[$ms[$message[3]];time]**!
$onlyif[$checkcontains[$tolowercase[$message[3]];h;m;s]$checkcondition[$isnumber[$replacetext[$replacetext[$replacetext[$tolowercase[$message[3]];h;];m;];s;]]==true]==truetrue;\`\`\`Enter a valid time duration, example 1m, 2h, 5s etc!\`\`\`]
$onlyif[$checkcontains[$userroles[$authorid;ids;.];$joinsplittext[;]]==true;\`\`\`You do not have any of the staff roles of the server!\`\`\`]
$textsplit[$getservervar[staff_roles];/]
$onlyif[$getservervar[staff_roles]!=;\`\`\`The server's staff roles are not yet set! Use **$getservervar[prefix]config staff roles @role mention array**\`\`\`]
$elseif[$tolowercase[$message[2]]==comments]
$setservervar[scomments;$tolowercase[$message[3]]]
Successfully set the settings of comments to: **$message[3]**!
$onlyif[$checkcondition[$message[3]!=]$checkcondition[$replacetext[$replacetext[$tolowercase[$message[3]];true;];false;]==]==truetrue;\`\`\`Enter either TRUE or FALSE! This determines whether the people can add comments or not!\`\`\`]
$onlyif[$checkcontains[$userroles[$authorid;ids;.];$joinsplittext[;]]==true;\`\`\`You do not have any of the staff roles of the server!\`\`\`]
$textsplit[$getservervar[staff_roles];/]
$onlyif[$getservervar[staff_roles]!=;\`\`\`The server's staff roles are not yet set! Use **$getservervar[prefix]config staff roles @role mention array**\`\`\`]
$endelseif
$elseif[$tolowercase[$message[2]]==dm]
$setservervar[dm;$tolowercase[$message[3]]]
Successfully set the settings of DMs after a suggestion is decided on to: **$message[3]**!
$onlyif[$checkcondition[$message[3]!=]$checkcondition[$replacetext[$replacetext[$tolowercase[$message[3]];true;];false;]==]==truetrue;\`\`\`Enter either TRUE or FALSE! This determines whether the bot DMs the users after a suggestion is decided on or not!\`\`\`]
$onlyif[$checkcontains[$userroles[$authorid;ids;.];$joinsplittext[;]]==true;\`\`\`You do not have any of the staff roles of the server!\`\`\`]
$textsplit[$getservervar[staff_roles];/]
$onlyif[$getservervar[staff_roles]!=;\`\`\`The server's staff roles are not yet set! Use **$getservervar[prefix]config staff roles @role mention array**\`\`\`]
$endelseif
$elseif[$tolowercase[$message[2]]==channel]
$setservervar[schannel;$mentionedchannels[1]]
Successfully set the suggestions channel to <#$mentionedchannels[1]>, and all the suggestions will not be redirected there!
$onlyif[$mentionedchannels[1]!=;\`\`\`Mention atleast 1 channel!\`\`\`]
$onlyif[$checkcontains[$userroles[$authorid;ids;.];$joinsplittext[;]]==true;\`\`\`You do not have any of the staff roles of the server!\`\`\`]
$textsplit[$getservervar[staff_roles];/]
$onlyif[$getservervar[staff_roles]!=;\`\`\`The server's staff roles are not yet set! Use **$getservervar[prefix]config staff roles @role mention array**\`\`\`]
$endelseif
$else
\`\`\`$usertag, there are 3 options you can choose from:
1. $getservervar[prefix]config suggestions cooldown <cooldown time>
2. $getservervar[prefix]config suggestions comments <true or false>
3. $getservervar[prefix]config suggestions dm <true or false>
4. $getservervar[prefix]config suggestions channel <channel where suggestions would go>\`\`\`
$onlyif[$checkcontains[$userroles[$authorid;ids;.];$joinsplittext[;]]==true;\`\`\`You do not have any of the staff roles of the server!\`\`\`]
$textsplit[$getservervar[staff_roles];/]
$onlyif[$getservervar[staff_roles]!=;\`\`\`The server's staff roles are not yet set! Use **$getservervar[prefix]config staff roles @role mention array**\`\`\`]
$endif
$endelseif
$elseif[$tolowercase[$message[1]]==server]
$if[$tolowercase[$message[2]]==prefix]
$setservervar[prefix;$message[3]]
Successfully updated the server prefix to **$message[3]**!
$onlyif[5>=$charcount[$noescapingmessage[3]];\`\`\`Please keep the server prefix of 5 or lesser characters!\`\`\`]
$onlyif[$checkcontains[$userroles[$authorid;ids;.];$joinsplittext[;]]==true;\`\`\`You do not have any of the staff roles of the server!\`\`\`]
$textsplit[$getservervar[staff_roles];/]
$onlyif[$getservervar[staff_roles]!=;\`\`\`The server's staff roles are not yet set! Use **$getservervar[prefix]config staff roles @role mention array**\`\`\`]
$elseif[$tolowercase[$message[2]]==resetcount]
$setservervar[scount;0]
I successfully reset the server suggestions count to 0!
$endelseif
$elseif[$checkcontains[$checkcondition[$tolowercase[$message[2]]==bl]$checkcondition[$tolowercase[$message[2]]==blacklist];true]==true]
$setuservar[blacklist;$tolowercase[$message[4]];$mentioned[1]]
I successfully set the blacklist of **$usertag[$mentioned[1]]** to: **$message[4]**!
$onlyif[$checkcondition[$message[4]!=]$checkcondition[$replacetext[$replacetext[$tolowercase[$message[4]];true;];false;]==]==truetrue;\`\`\`Enter either TRUE or FALSE! This determines whether the user is blacklisted or not!\`\`\`]
$onlyif[$memberexists[$get[member]]==true;\`\`\`The member $message[3] was not found!\`\`\`]
$let[member;$findmember[$message[3];no]]
$onlyif[$checkcontains[$userroles[$authorid;ids;.];$joinsplittext[;]]==true;\`\`\`You do not have any of the staff roles of the server!\`\`\`]
$textsplit[$getservervar[staff_roles];/]
$onlyif[$getservervar[staff_roles]!=;\`\`\`The server's staff roles are not yet set! Use **$getservervar[prefix]config staff roles @role mention array**\`\`\`]
$endelseif
$else
\`\`\`$usertag, you have 3 choices to choose from:
1. $getservervar[prefix]config server prefix <new prefix>
2. $getservervar[prefix]config server resetcount
3. $getservervar[prefix]config server <blacklist/bl> <user> <true/false>\`\`\`
$onlyif[$checkcontains[$userroles[$authorid;ids;.];$joinsplittext[;]]==true;\`\`\`You do not have any of the staff roles of the server!\`\`\`]
$textsplit[$getservervar[staff_roles];/]
$onlyif[$getservervar[staff_roles]!=;\`\`\`The server's staff roles are not yet set! Use **$getservervar[prefix]config staff roles @role mention array**\`\`\`]
$endif
$endelseif
$else
\`\`\`$usertag, there are 3 modules you can select from:\n1. $getservervar[prefix]config staff\n2. $getservervar[prefix]config suggestions\n3. $getservervar[prefix]config server\`\`\`
$endif`})
