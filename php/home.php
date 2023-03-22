<?php


//conn db
$conn = new mysqli('localhost', 'root', '', '7ahflamar');
if (!$conn) {
    die("Connection Failed : " . mysqli_connect_error());
} 

if ($_POST['Email']&&$_POST['CName']&&$_POST['Phone']&&$_POST['Date']&&$_POST['CTime']){
    $Email = $_POST['Email'];
    $FullName = $_POST['CName'];
    $Phone = $_POST['Phone'];
    $Date = $_POST['Date'];
    $CTime = $_POST['CTime'];
    $balloon = 'balloon-ds123';
    $flower = 'flower - mkkd3';
    $drink = 'drink- 6216';
    $accessories = 'accessories-dsjnk656';
            $car = 'car - g    tr4569';
            $chair = 'chair 6162';
            $cake = 'cake 9453';
            $DJ = 'DJ hd 99';
            $desert = 'desert -dcn 6';
            $place = 'place-df123';
            $price = '986575';

$sql = "insert into Event (Email,FullName,Phone,Date,Time,Balloon,Flower,Drink,Accessories, Car,Chair,Cake,DJ,Desert,Place,Total) values ('$Email','$FullName','$Phone','$Date','$CTime','$balloon','$flower','$drink','$accessories','$car' ,'$chair','$cake' , '$DJ' ,'$desert' , '$place','$price')";
if(mysqli_query($conn,$sql)){
    echo '<script>alert("event added successfuly")</script>';
    header("location:../html/index.html");
}

}

/*else {
    $stmt = $conn->prepare("insert into registration(Email,CName,phone,Date,CTime) values(?,?,?,?,?)");
    $stmt->bind_param("ssiii", $email, $fullname, $phonenumber, $date, $time);
    $stmt->execute();
    echo "registration Successfully....";
    $stmt->close();
    $conn->close();
}*/
?>
