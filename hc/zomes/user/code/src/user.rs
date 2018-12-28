use hdk::{
    entry_definition::{
        ValidatingEntryType,
        ValidatingLinkDefinition,
    },
    error::{ZomeApiError, ZomeApiResult},
    holochain_core_types::cas::content::Address,
    holochain_core_types::dna::zome::entry_types::Sharing,
    holochain_core_types::entry::{entry_type::EntryType, Entry},
    holochain_core_types::error::HolochainError,
    holochain_core_types::json::JsonString,
    AGENT_ADDRESS,
};
use std::convert::TryFrom;
use super::utils;

/*********************************************************
  STRUCTS
 *********************************************************/

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct User {
    pub id: String,
    pub name: String,
    pub agent_id: String,
    pub created_at: String,
    pub updated_at: String
}

/*********************************************************
  ZOME FUNCTIONS
 *********************************************************/

pub fn definition() -> ValidatingEntryType {
    entry!(
        name: "user",
        description: "A user profile",
        sharing: Sharing::Public,
        native_type: User,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: |_user: User, _ctx: hdk::ValidationData| {
            Ok(())
        },
        links: [
            agent_user_link()
            // app_user_link()
        ]
    )
}

pub fn handle_create_user(id: String, name: String) -> JsonString {
    let user = User {
        id,
        name,
        agent_id: AGENT_ADDRESS.to_string(), // use AGENT_ID_STR !!!!!
        updated_at: "".to_string(),
        created_at: "2018-11-28 12:00:09 UTC".to_string() // use current utc date !!!!!
    };
    let entry = Entry::new(EntryType::App("user".into()), user);
    match hdk::commit_entry(&entry) {
        Ok(address) => match hdk::link_entries(&AGENT_ADDRESS, &address, "user") {
            Ok(_) => json!({ "address": address, "entry": entry.to_string() }).into(),
            Err(hdk_err) => hdk_err.into(),
        },
        Err(hdk_err) => hdk_err.into(),
    }
}

pub fn handle_get_my_users() -> JsonString {
    match get_my_users() {
        Ok(result) => result.into(),
        Err(hdk_err) => hdk_err.into(),
    }
    // json!({ "address": "abc".to_string(), "entry": "123".to_string() }).into()
}

/*********************************************************
  VALIDATION
 *********************************************************/

/*********************************************************
  VALIDATION PACKAGES
 *********************************************************/

 /*********************************************************
  HELPERS
 *********************************************************/

 fn agent_user_link() -> ValidatingLinkDefinition {
    from!(
        "%agent_id",
        tag: "user",
        validation_package: || {
            hdk::ValidationPackageDefinition::ChainFull
        },
        validation: |_source: Address, _target: Address, _ctx: hdk::ValidationData| {
            Ok(())
        }
    )
}

fn get_my_users() -> ZomeApiResult<Vec<User>> {
    utils::get_links_and_load(&AGENT_ADDRESS, "user").map(|results| {
        results
            .iter()
            .map(|get_links_result| {
                User::try_from(get_links_result.entry.value().clone()).unwrap()
            })
            .collect()
    })
}

 /*********************************************************
  DEBUGGING
 *********************************************************/

 

// private