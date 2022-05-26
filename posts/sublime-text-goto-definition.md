---
title: Sublime Text - Goto Definition
date: 2015-09-15
permalink: /blog/2015/09/15/sublime-text-goto-definition/
---

Sublime Text 3 (Build 3006) introduced the most awaiting feature i.e. the "Goto Definition" functionality which I always longed for. It isn't as powerful as in IDEs like PHPStorm or Netbeans but it definitely is something. 

Below is the snippet that you may use to integrate the "Goto Definition" to it's *rightful* shortcut i.e. `ctrl`+`click`

```javascript
Linux - create "Default (Linux).sublime-mousemap" in ~/.config/sublime-text-3/Packages/User
Mac - create "Default (OSX).sublime-mousemap" in ~/Library/Application Support/Sublime Text 3/Packages/User
Win - create "Default (Windows).sublime-mousemap" in %appdata%\Sublime Text 3\Packages\User

[
    {
        "button": "button1", 
        "count": 1, 
        "modifiers": ["ctrl"],
        "press_command": "drag_select",
        "command": "goto_definition"
    }
]
```

[Reference URL](https://gist.github.com/kendellfab/6135193)
