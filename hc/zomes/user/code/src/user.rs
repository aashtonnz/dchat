use hdk::{
    entry_definition::{
        ValidatingEntryType,
        // ValidatingLinkDefinition,
    },
    holochain_core_types::dna::zome::entry_types::Sharing,
    holochain_core_types::entry::{entry_type::EntryType, Entry},
    holochain_core_types::error::HolochainError,
    holochain_core_types::json::JsonString,
    AGENT_INITIAL_HASH,
};

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct User {
    pub id: String,
    pub name: String,
    pub agent_id: String,
    pub created_at: String,
    pub updated_at: String
}

pub fn user_definition() -> ValidatingEntryType {
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
            // agent_channel_link(),
            // channel_message_link()
        ]
    )
}

pub fn handle_create_user(id: String, name: String) -> JsonString {
    let user = User {
        id,
        name,
        agent_id: AGENT_INITIAL_HASH.to_string(), // use AGENT_ID_STR !!!!!
        updated_at: "".to_string(),
        created_at: "2018-11-28 12:00:09 UTC".to_string() // use current utc date !!!!!
    };
    let entry = Entry::new(EntryType::App("user".into()), user);
    match hdk::commit_entry(&entry) {
        Ok(address) => json!({ "address": address, "entry": entry.to_string() }).into(),
        Err(hdk_err) => hdk_err.into(),
    }
}