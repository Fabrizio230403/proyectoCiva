package sistemaBusesBackend.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import sistemaBusesBackend.dto.BusDTO;
import sistemaBusesBackend.entity.Bus;

@Mapper(componentModel = "spring")
public interface BusMapper {
	
	@Mapping(source = "marca.nombre", target = "marcaNombre")
    BusDTO toDto(Bus bus);
	
	List<BusDTO> toDtoList(List<Bus> buses);
}
