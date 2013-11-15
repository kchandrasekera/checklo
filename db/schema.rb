# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131115064551) do

  create_table "boards", :force => true do |t|
    t.string   "board_name", :null => false
    t.integer  "user_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "position",   :null => false
  end

  add_index "boards", ["position"], :name => "index_boards_on_position"
  add_index "boards", ["user_id"], :name => "index_boards_on_user_id"

  create_table "cards", :force => true do |t|
    t.string   "card_name",                     :null => false
    t.date     "due_date"
    t.boolean  "completed",  :default => false
    t.text     "comment"
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
    t.integer  "list_id",                       :null => false
    t.integer  "position",                      :null => false
  end

  add_index "cards", ["list_id"], :name => "index_cards_on_list_id"
  add_index "cards", ["position"], :name => "index_cards_on_position"

  create_table "lists", :force => true do |t|
    t.string   "list_name",  :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "board_id",   :null => false
    t.integer  "position",   :null => false
  end

  add_index "lists", ["board_id"], :name => "index_lists_on_board_id"
  add_index "lists", ["position"], :name => "index_lists_on_position"

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0,  :null => false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "username",                               :null => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
