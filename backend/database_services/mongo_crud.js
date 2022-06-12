const mongoose = require('mongoose');
require('../models/userData');

const deleteQuery = async(query_params)=>{
    const { modelName, condition, query_type = "default"} = query_params;
    const groupModel = mongoose.model(modelName);
    let delete_data = '';
    switch (query_type) {
        case "deleteOne":
            delete_data = await groupModel.deleteOne(condition);
            break;
        default:
            delete_data = await groupModel.deleteMany(condition);
            break;
    }
    return delete_data;
};

const insertquery = async(query_params)=>{
    const {modelName, data, queryType = 'default'} = query_params;
    const groupModel = mongoose.model(modelName);
    // console.log("insert Query", query_params);
    let insert ='';
    switch (queryType) {
        case "1":
            insert = await groupModel.insertMany(data);
            break;
        default:
            insert = await groupModel.create(data);
            break;
    }

    return insert;
};

const distinctQuery = async(query_params)=>{
    const { modelName, distinct_name, where } = query_params;
    const groupModel = mongoose.model(modelName);
    const distinct_data = await groupModel.distinct(distinct_name, where );
    return distinct_data;
};

const find_all = async(query_params)=>{
    const { modelName, where = {}, select = {}, sort = {} ,limit = 0, skip = 0 } = query_params;
    // console.log("Find Query", query_params);
    const groupModel = mongoose.model(modelName);
    return await groupModel.find(where, select).sort(sort).limit(limit).skip(skip);
};

const find_one = async(query_params)=>{
    const { modelName, where = {}, select = {}, sort = {} ,limit = 0, skip = 0 } = query_params;
    // console.log("Find Query", query_params);
    const groupModel = mongoose.model(modelName);
    return await groupModel.findOne(where, select).sort(sort).limit(limit).skip(skip);
};

const update = async(query_params)=>{
    const {modelName, where, updateData, queryType} = query_params;
    // console.log("update Query",query_params);

    const groupModel = mongoose.model(modelName);
    let update='';
    switch (queryType) {
        case 'updateOne':
            update = await groupModel.updateOne(where, updateData);        
            break;
        case 'updateMany':
            update = await groupModel.updateMany(where, updateData);
            break;
        default:
            update = await groupModel.findOneAndUpdate(where, updateData, {upsert:true, new : true});                   
            break;
    }
    return update;
};

const count_records = async (query_params)=>{
    const { modelName, condition= {} } = query_params;
    const groupModel = mongoose.model(modelName);
    return await groupModel.countDocuments(condition);
};

const find_raw = async (query_params) => {
    const {modelName, where = {}} = query_params;
    return await mongoose.collection(modelName).find(where.condition).toArray();
};

const find_distinct = async(query_params)=>{
    const {modelName, distinct_key, where = {}} = query_params;
    console.log(query_params);
    return await mongoose.model(modelName).distinct(distinct_key, where);
};

const group_by = async(query_params)=>{

    const { modelName, where = {}, groupData = {} } = query_params;

    const groupModel = mongoose.model(modelName);

    const data1 = await groupModel.aggregate([
        {
          $match: where
        },
        {
          $group: groupData
        }
      ]);
    
    return data1;
};

module.exports = { deleteQuery, insertquery, distinctQuery, find_all, find_one, find_raw, update, count_records, find_distinct, group_by};