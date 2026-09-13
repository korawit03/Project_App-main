import React from 'react';
import { useParams } from 'react-router-dom';
import Pegasus from '../assets/Pegasus 42.jpg';
import Adizero from '../assets/Adizero Evo SL.jpg';
import Vomero from '../assets/Vomero Plus.jpg';
const productList = [
{ id: 1, name: 'Pegasus', description: 'Nike Pegasus 42 มาพร้อมระบบลดแรงกระแทกที่ตอบสนองได้ดี ให้ความรู้สึกนุ่มเด้งในทุกก้าว ด้วยโฟม ReactX น้ำหนักเบาที่ตอบสนองได้ดี พร้อมส่วน Air Zoom ที่ปลายเท้าและส้นเท้าเพื่อเพิ่มแรงส่งและความสบายตลอดการวิ่ง ส่วนบนตาข่ายน้ำหนักเบาช่วยระบายอากาศได้ดี ขณะที่พื้นรองเท้าชั้นนอกลายวาฟเฟิลทำจากยางทนการเสียดสีสูง ให้การยึดเกาะและความยืดหยุ่นที่ดี เหมาะสำหรับทั้งการวิ่งและการสวมใส่ในชีวิตประจำวัน', price: 5200, image: Pegasus },
{ id: 2, name: 'Adizero', description: 'สัมผัสประสบการณ์ความไวได้ใน Adizero Evo SL แรงบันดาลใจจากนวัตกรรมของรองเท้าระดับทำลายสถิติในตระกูลรองเท้าวิ่ง Adizero และโดยเฉพาะ Pro Evo 1 รองเท้า Evo SL ออกแบบมาเพื่อให้คุณใส่วิ่งและใส่ทำกิจกรรมอื่นได้ ผสานเทคโนโลยี Adizero เข้ากับความงดงามที่โดดเด่นและไม่เหมือนใครที่ได้แรงบันดาลใจจากรองเท้าวิ่งแข่ง จึงเป็นวิวัฒนาการแห่งความไวในทุกด้านของชีวิต ชั้นโฟม LIGHTSTRIKE PRO ที่ตอบสนองได้ดีในพื้นชั้นกลางจะมอบความสบายและการรับแรงกระแทกเพื่อการส่งคืนพลังอย่างเต็มประสิทธิภาพ', price: 5800, image: Adizero },
{ id: 3, name: 'Vomero', description: 'รองเท้าวิ่งที่ยกระดับความนุ่มสบายไปอีกขั้น ด้วยโฟม ZoomX แบบเต็มความยาวเท้าที่เรียงซ้อนสูง มอบการตอบสนองและแรงส่งคืนได้อย่างยอดเยี่ยมในทุกย่างก้าว เหมาะสำหรับการวิ่งในทุกวัน ส่วนบนจากตาข่าย engineered mesh ใช้เส้นด้ายเนื้อนุ่มที่ระบายอากาศได้ดี ให้ความกระชับสบาย พื้นรองเท้าชั้นนอกจากยางต้านการเสียดสีสูงช่วยเพิ่มความทนทานและการยึดเกาะ มาพร้อมดรอป 10 มม. และดีเทลสะท้อนแสง เพิ่มความมั่นใจในทุกการวิ่ง', price: 6100, image: Vomero },
];
export default function ProductDetail() {
const { id } = useParams();
const product = productList.find(p => p.id === parseInt(id));
if (!product) return <p>ไม่พบสินค้ำที่ต้องกำร</p>;
return (
<div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100">
<img src={product.image} alt={product.name} className="w-full max-w-sm rounded-xl mb-4 mx-auto shadow-sm" />
<h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
<p className="text-gray-600 leading-relaxed mt-2">{product.description}</p>
<p className="text-green-600 font-bold text-lg mt-4">ราคา: {product.price.toLocaleString()} บาท</p>
</div>
);
}