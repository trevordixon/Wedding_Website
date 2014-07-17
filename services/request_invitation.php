<?php

ini_set('display_errors','On');
error_reporting(E_ALL);

include('fusion/clientlogin.php');
include('fusion/sql.php');
include('fusion/file.php');

//get token
$token = ClientLogin::getAuthToken('trevordixon', 'z6mesw9j');
$ftclient = new FTClientLogin($token);

$table_id = 3196716;
if (!empty($_POST)) {
  if (!empty($_POST['rowid'])) {
    // Update existing
    $rowid = $_POST['rowid'];
    unset($_POST['rowid']);
    $_POST['Requested Invite'] = date('Y-M-d H:i:s');
    echo $ftclient->query(SQLBuilder::update($table_id, $_POST, $rowid));
  } else {
    // Insert new
    $_POST['Requested Invite'] = date('Y-M-d H:i:s');
    $ftclient->query(SQLBuilder::insert($table_id, $_POST));
  }
} elseif (array_key_exists('email', $_GET)) {
  $result = explode("\n", $ftclient->query(SQLBuilder::select($table_id, array('rowid', 'Name', 'Address', 'City', 'State', 'Zip', 'Phone'), "'Email'='" . $_GET['email'] . "'")));
  $fields = str_getcsv($result[0]);
  $values = str_getcsv($result[1]);
  
  $return = (count($fields) == count($values)) ? array_combine($fields, $values) : new stdClass();
  echo json_encode($return);
}
//echo $ftclient->query(SQLBuilder::insert(3196716, array('Name'=>'Trevor', 'Requested Invite' => date('Y-M-d H:i:s'), 'Address' => '1249 Shadow Gate Circle', 'Email' => 'trevordixon@gmail.com')));

die();

//show all tables
print_r($ftclient->query(SQLBuilder::showTables()));
echo "<br />";

//describe a table
echo $ftclient->query(SQLBuilder::describeTable(3196716));
echo "<br />";

//select * from table
echo $ftclient->query(SQLBuilder::select(3196716));
echo "<br />";

//select * from table where test=1
echo $ftclient->query(SQLBuilder::select(3196716, null, "'test'=1"));
echo "<br />";

//select test from table where test = 1
echo $ftclient->query(SQLBuilder::select(3196716, array('test'), "'test'=1"));
echo "<br />";

//select rowid from table
echo $ftclient->query(SQLBuilder::select(358077, array('rowid')));
echo "<br />";

//delete row 401
echo $ftclient->query(SQLBuilder::delete(358077, '401'));
echo "<br />";

//drop table
echo $ftclient->query(SQLBuilder::dropTable(358731));
echo "<br />";

//update table test=1 where rowid=1
echo $ftclient->query(SQLBuilder::update(358077, array('test'=>12), 1));
echo "<br />";

//insert into table (test, test2, 'another test') values (12, 3.3333, 'bob')
echo $ftclient->query(SQLBuilder::insert(358077, array('test'=>12, 'test2' => 3.33333, 'another test' => 'bob')));

?>
