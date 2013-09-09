exports.findhotel = function(req, res) {
    var q = [];
    var len = hotel.length;
    var queryString = req.query.id;
    var hotel_obj = function(obj, i) {
        this.name = obj.name;
        this.address = obj.address;
        this.state = obj.state;
        this.phone = obj.phone;
        this.fax = obj.fax;
        this.website = obj.website;
        this.type = obj.type;
        this.room = obj.room;
        this.email = obj.email;
        this.city = city[i];
        this.hoteljson = true;

    };
    console.log(queryString);
    var idx = hotel_array.state.indexOf(queryString.toUpperCase());

    while (idx != -1) {
        console.log("inside");
        var newObj = new hotel_obj(hotel[idx], idx);
        q.push(newObj);
        idx = hotel_array.state.indexOf(queryString.toUpperCase(), idx + 1);
    }
    if (q.length === 0) {

        var name_temp = new RegExp("(^|[ ,-])" + queryString + "([ ,-]|$)", "i");

        for (var i = 0; i < len; i++) {
            try {
                if (hotel_array.address[i].match(name_temp)) {
                    console.log("match add")
                    var newObj = new hotel_obj(hotel[i], i);
                    q.push(newObj);
                    continue;
                } else if (hotel_array.name[i].match(name_temp)) {
                    var newObj = new hotel_obj(hotel[i], i);
                    q.push(newObj);
                    continue;
                }else if (hotel_array.type[i].match(name_temp)) {
                    var newObj = new hotel_obj(hotel[i], i);
                    q.push(newObj);
                    continue;
            }
            } catch (err) {
                console.log("Catch error: " + err);
            }

        }
    }

    if (q.length === 0)
        res.send(404, 'No hotel found');

    res.json(q);

};

exports.findagent = function(req, res) {
    var q = [];

    var agent_obj = function(obj) {
        this.name = obj.name;
        this.address = obj.address;
        this.state = obj.state;
        this.phone = obj.phone;
        this.fax = obj.fax;
        this.email = obj.email;
        this.website = obj.website;
        this.type = obj.type;
        this.region = obj.region;
        this.person = obj.person;
        this.city = obj.city;
        this.hoteljson = false;
    };
    var len = agent.length;
    var queryString = req.query.id;
    console.log(queryString);

    var idx = agent_array.state.indexOf(queryString.toUpperCase());

    while (idx != -1) {
        var newObj = new agent_obj(agent[idx]);
        q.push(newObj);
        idx = agent_array.state.indexOf(queryString.toUpperCase(), idx + 1);
    }

   if (q.length === 0) {
    var name_temp = new RegExp("(^|[ ,-])" + queryString + "([ ,]|$)", "i");


    for (var i = 0; i < len; i++) {
        try {
            if (agent_array.city[i].match(name_temp)) {
                var newObj = new agent_obj(agent[i]);
                q.push(newObj);
                continue;
            } else if (agent_array.state[i].match(name_temp)) {
                var newObj = new agent_obj(agent[i]);
                q.push(newObj);
                continue;
            } else if (agent_array.name[i].match(name_temp)) {
                var newObj = new agent_obj(agent[i]);
                q.push(newObj);
                continue;
            } else if (agent_array.region[i].match(name_temp)) {
                var newObj = new agent_obj(agent[i]);
                q.push(newObj);
                continue;
            } else if (agent_array.type[i].match(name_temp)) {
                var newObj = new agent_obj(agent[i]);
                q.push(newObj);
                continue;
            } else if (agent_array.address[i].match(name_temp)) {
                var newObj = new agent_obj(agent[i]);
                q.push(newObj);
                continue;
            }
        } catch (err) {
            console.log("Catch error: " + err);
        }


    }
}

    if (q.length === 0)
        res.send(404, 'No hotel found');


    res.json(q);

};
