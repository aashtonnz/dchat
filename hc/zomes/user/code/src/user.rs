use hdk::{
    holochain_core_types::json::JsonString,
};

pub fn handle_create_user(id: String, name: String) -> JsonString {
    json!({
        "success": true,
        "id": id,
        "name": name
    }).into()
}